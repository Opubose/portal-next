import { PrismaClient } from '@prisma/client';
import { getPrismaConnection } from 'lib/prisma/manager';
import { singleton } from "tsyringe";
import { Division, Officer } from '@generated/type-graphql';

@singleton()
export default class DivisionService {
  private prismaConnection: PrismaClient;
  constructor() {
    this.prismaConnection = getPrismaConnection();
  }
  async getDivisionsOfUser(userId: string): Promise<Division[]> {
    return this.prismaConnection.division.findMany({
      where: {
        officers: {
          some: {
            profile: {
              is: {
                userId: {
                  equals: userId
                }
              }
            }
          }
        }
      }
    });
  }
  async getOfficerByDivisions(divisions: Division[]): Promise<Officer[]> {
    const divisionNames = divisions.map((d) => d.deptName);
    return this.prismaConnection.officer.findMany({
      where: {
        divisions: {
          some: {
            deptName: {
              in: divisionNames
            }
          }
        }
      }
    });
  }
}
