import { PrismaClient } from '@prisma/client';
import { getPrismaConnection } from 'lib/prisma/manager';
import { singleton } from 'tsyringe';
import { TypeformSubmission, Profile } from '@generated/type-graphql';
import { TContext } from '../interfaces/context.interface';

@singleton()
export default class AdditionalProfileService {
  private prismaConnection: PrismaClient;
  constructor() {
    this.prismaConnection = getPrismaConnection();
  }
  async getTypeformSubmissionsByProfileEmail(profileEmail: string): Promise<TypeformSubmission[]> {
    return this.prismaConnection.typeformSubmission.findMany({
      where: {
        email: {
          equals: profileEmail,
        },
      },
    });
  }

  async toggleMembershipStatus(profileId: string, membershipStatus: boolean): Promise<boolean> {
    await this.prismaConnection.profile.update({
      where: {
        id: profileId,
      },
      data: {
        membershipStatus,
      },
    });
    return membershipStatus;
  }

  async isMember(profile: Profile, ctx: TContext): Promise<boolean> {
    if (profile.membershipStatus) return true;
    const isOfficer = await ctx.officerByProfileLoader.load(profile.id);
    if (isOfficer) return true;
    const numEvents = await ctx.eventCountByProfileLoader.load(profile.id);
    return numEvents >= 3;
  }
}
