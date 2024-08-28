import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { ScoreEntry } from '@generated/type-graphql';
import { injectable } from 'tsyringe';
import type { TContext } from '../interfaces/context.interface';

@Resolver(() => ScoreEntry)
@injectable()
export default class AdditionalScoreEntryResolver {
  @FieldResolver(() => Number)
  async totalScore(@Root() scoreEntry: ScoreEntry, @Ctx() context: TContext): Promise<number> {
    const rules = await context.prisma.scoreRule.findMany({
      where: {
        eventCategory: {
          id: {
            in: scoreEntry.eventClaims,
          },
        },
        scoreboardId: scoreEntry.scoreboardId,
      },
    });
    return rules.reduce((acc: number, curr) => acc + curr.scoreValue, 0);
  }
}
