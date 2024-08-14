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
}
