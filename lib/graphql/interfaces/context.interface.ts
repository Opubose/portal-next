import { PrismaClient } from '@prisma/client';
import { Session } from 'next-auth';
import { OfficerByProfileIdDataLoader } from '../dataloader/officer.dataloader';
import { EventCountByProfileIdDataLoader } from '../dataloader/event.dataloader';

export interface TContext {
  req: any;
  session?: Session;
  prisma: PrismaClient;
  sentEmail?: boolean;
  officerByProfileLoader: ReturnType<typeof OfficerByProfileIdDataLoader>;
  eventCountByProfileLoader: ReturnType<typeof EventCountByProfileIdDataLoader>;
}
