import { PrismaClient } from '@prisma/client';
import { getPrismaConnection } from 'lib/prisma/manager';
import { singleton } from 'tsyringe';
import { Scoreboard } from '@generated/type-graphql';

@singleton()
export default class ScoreboardService {
  private prismaConnection: PrismaClient;
  constructor() {
    this.prismaConnection = getPrismaConnection();
  }
  async getScoreboardByDivisions(divisionIds: string[]): Promise<Scoreboard[]> {
    return this.prismaConnection.scoreboard.findMany({
      where: {
        divisionId: {
          in: divisionIds,
        },
      },
    });
  }
  async resetScoreboardById(scoreboardId: string): Promise<void> {
    const scoreEntries = await this.prismaConnection.scoreEntry.findMany({
      where: {
        scoreboardId,
      },
    });
    await Promise.all(
      scoreEntries.map(async (entry) => {
        await this.prismaConnection.scoreEntry.update({
          where: {
            id: entry.id,
          },
          data: {
            eventClaims: {
              set: [],
            },
          },
        });
      }),
    );
  }
}
