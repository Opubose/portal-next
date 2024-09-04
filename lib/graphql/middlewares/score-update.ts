import { MiddlewareFn } from 'type-graphql';
import { TContext } from '../interfaces/context.interface';

type EventReservationResult = {
  id: string;
  profileId: string;
  eventId: string;
  status: string;
  alreadyCheckedIn: boolean;
};

export const scoreUpdateAfterCheckIn: MiddlewareFn<TContext> = async ({ context }, next) => {
  const eventReservation: EventReservationResult = await next();
  if (eventReservation.alreadyCheckedIn) return eventReservation;
  const eventCategory = await context.prisma.eventCategory.findFirst({
    where: {
      events: {
        some: {
          id: {
            equals: eventReservation.eventId,
          },
        },
      },
    },
  });
  if (!eventCategory) {
    return eventReservation;
  }
  const rules = await context.prisma.scoreRule.findMany({
    where: {
      scoreboard: {
        scoreEntries: {
          some: {
            participant: {
              profile: {
                id: eventReservation.profileId,
              },
            },
          },
        },
      },
      eventCategory: {
        id: eventCategory.id,
      },
    },
    include: {
      scoreboard: true,
    },
  });
  const deltas = await Promise.all(
    rules.map(async (rule) => {
      const scoreEntry = await context.prisma.scoreEntry.findFirst({
        where: {
          scoreboardId: rule.scoreboard.id,
          participant: {
            profile: {
              id: eventReservation.profileId,
            },
          },
        },
      });
      // NOTE: scoreEntry being null shouldn't happen
      if (scoreEntry) {
        await context.prisma.scoreEntry.update({
          data: {
            eventClaims: {
              push: eventCategory.id,
            },
          },
          where: {
            id: scoreEntry.id,
          },
        });
        return {
          scoreboardName: rule.scoreboard.scoreboardName,
          scoreValue: rule.scoreValue,
        };
      } else {
        return {
          scoreboardName: rule.scoreboard.scoreboardName,
          scoreValue: 0,
        };
      }
    }),
  );
  return {
    ...eventReservation,
    points: deltas.filter((delta) => delta.scoreValue > 0),
  };
};
