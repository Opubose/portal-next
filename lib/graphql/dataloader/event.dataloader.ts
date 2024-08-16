import { getPrismaConnection } from 'lib/prisma/manager';
import DataLoader from 'dataloader';

async function batchQueryEventCountByProfileIds(profileIds: readonly string[]): Promise<number[]> {
  const prismaConnection = getPrismaConnection();
  const eventListMapping = new Map<string, number>();
  const events = await prismaConnection.event.findMany({
    where: {
      profiles: {
        some: {
          id: {
            in: [...profileIds],
          },
        },
      },
    },
    include: {
      profiles: true,
    },
  });
  events.forEach((event) => {
    event.profiles.forEach((profile) => {
      if (!eventListMapping.has(profile.id)) eventListMapping.set(profile.id, 0);
      eventListMapping.set(profile.id, eventListMapping.get(profile.id)! + 1);
    });
  });
  return profileIds.map((profileId) => {
    if (eventListMapping.has(profileId)) return eventListMapping.get(profileId)!;
    return 0;
  });
}

export const EventCountByProfileIdDataLoader = () =>
  new DataLoader<string, number>(batchQueryEventCountByProfileIds);
