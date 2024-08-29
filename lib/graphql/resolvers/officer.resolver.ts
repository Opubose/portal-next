import { Officer, Profile } from "@generated/type-graphql";
import { injectable } from "tsyringe";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import OfficerService from "../services/officer.service";
import { AddUserToDivisionInput } from "../schemas/Officer";
import { onlyDirectorAllowed } from "../middlewares/only-director";
import { InjectSessionMiddleware } from "../middlewares/inject-session";
import type { TContext } from "../interfaces/context.interface";
import DivisionService from "../services/divisions.service";

@Resolver(() => Officer)
@injectable()
export default class OfficerResolver {
    constructor(private officerService: OfficerService, private divisionService: DivisionService) {}
    @Mutation(() => String)
    @UseMiddleware(onlyDirectorAllowed)
    async addUserToDivision(
        @Arg('data', () => AddUserToDivisionInput) data: AddUserToDivisionInput
    ) {
        await this.officerService.addUserToDivision(data.profileId, data.divisionId);
        return "done";
    }

    @Query(() => [Profile])
    @UseMiddleware(onlyDirectorAllowed)
    async officerEligibleProfiles() {
        return this.officerService.getOfficerEligibleProfiles();
    }
    
    @Query(() => [Officer])
    @UseMiddleware(InjectSessionMiddleware)
    @UseMiddleware(onlyDirectorAllowed)
    async directorEligibleOfficers(@Ctx() context: TContext) {
        const targetDivisions = await this.divisionService.getDivisionsOfUser(context.session!.id);
        return this.divisionService.getOfficerByDivisions(targetDivisions);
    }
} 
