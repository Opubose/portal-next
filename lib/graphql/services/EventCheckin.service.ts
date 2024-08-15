import { EventCheckinInput } from '../schemas/EventCheckin';
import { singleton } from 'tsyringe';
import { TContext } from '../interfaces/context.interface';

@singleton()
export default class EventCheckinService {
  async checkInEvent({ eventId, profileId }: EventCheckinInput, ctx: TContext) {
    const alreadyCheckedIn = !!(await ctx.prisma.eventReservation.findFirst({
      where: {
        profileId,
        eventId,
      },
    }));
    const res = await ctx.prisma.eventReservation.upsert({
      where: {
        profileId_eventId: {
          eventId,
          profileId,
        },
      },
      create: {
        profileId,
        eventId,
        status: 'checkin',
      },
      update: {
        status: 'checkin',
      },
    });
    return {
      ...res,
      alreadyCheckedIn,
    };
  }
}
