import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Scoreboard } from '@generated/type-graphql';
import { InjectSessionMiddleware } from '../middlewares/inject-session';
import { injectable } from 'tsyringe';
import ScoreboardService from '../services/scoreboard.service';
import DivisionService from '../services/divisions.service';
import { TContext } from '../interfaces/context.interface';

@Resolver(() => Scoreboard)
@injectable()
export default class AdditionalScoreboardResolver {
  constructor(
    private scoreboardService: ScoreboardService,
    private divisionService: DivisionService,
  ) {}

  @Query(() => [Scoreboard])
  @UseMiddleware(InjectSessionMiddleware)
  async scoreboards(@Ctx() context: TContext) {
    const divisions = await this.divisionService.getDivisionByUserId(context.session!.id);
    const divisionIds = divisions.map((division) => division.id);
    return this.scoreboardService.getScoreboardByDivisions(divisionIds);
  }
}
