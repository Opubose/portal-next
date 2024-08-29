import { injectable } from 'tsyringe';
import { Arg, Ctx, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from 'type-graphql';
import { Profile, TypeformSubmission } from '@generated/type-graphql';
import AdditionalProfileService from '../services/AdditionalProfileService.service';
import type { TContext } from '../interfaces/context.interface';
import { onlyExecutiveAndDevDirectorAllowed } from '../middlewares/division-director-only';

@Resolver(() => Profile)
@injectable()
export default class AdditionalProfileResolver {
  constructor(private profileService: AdditionalProfileService) {}

  @FieldResolver(() => [TypeformSubmission])
  async typeformSubmissions(@Root() profile: Profile): Promise<TypeformSubmission[]> {
    return this.profileService.getTypeformSubmissionsByProfileEmail(profile.email);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(onlyExecutiveAndDevDirectorAllowed)
  async toggleMembershipStatus(
    @Arg('profileId', () => String) profileId: string,
    @Arg('membershipStatus', () => Boolean) membershipStatus: boolean,
  ): Promise<boolean> {
    return this.profileService.toggleMembershipStatus(profileId, membershipStatus);
  }

  @FieldResolver(() => Boolean)
  async isMember(@Root() profile: Profile, @Ctx() ctx: TContext): Promise<boolean> {
    return this.profileService.isMember(profile, ctx);
  }
}
