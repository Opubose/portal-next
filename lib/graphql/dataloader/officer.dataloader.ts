import DataLoader from 'dataloader';
import { Officer } from '@generated/type-graphql';
import { getPrismaConnection } from 'lib/prisma/manager';

async function batchQueryOfficersByProfileIds(
  profileIds: readonly string[],
): Promise<(Officer | null)[]> {
  const prismaConnection = getPrismaConnection();
  const officerMapping = new Map<string, Officer>();
  const officers = await prismaConnection.officer.findMany({
    where: {
      profileId: {
        in: [...profileIds],
      },
    },
  });
  officers.forEach((officer) => {
    officerMapping.set(officer.profileId, officer);
  });
  return profileIds.map((id) => (officerMapping.has(id) ? officerMapping.get(id)! : null));
}

export const OfficerByProfileIdDataLoader = () =>
  new DataLoader<string, Officer | null>(batchQueryOfficersByProfileIds);
