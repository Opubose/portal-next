import { NonEmptyArray } from 'type-graphql';

import {
  EventRelationsResolver,
  EventReservationRelationsResolver,
  FindManyTypeformApplicationResolver,
  FindFirstTypeformApplicationResolver,
  CreateOneTypeformApplicationResolver,
  UpdateOneTypeformApplicationResolver,
  DeleteOneTypeformApplicationResolver,
  CreateOneEventResolver,
  UpdateOneEventResolver,
  DeleteOneEventResolver,
  FindManyEventResolver,
  DeleteOneDirectorResolver,
  FindManyProfileResolver,
  // DeleteProfileResolver,
  FindManyDirectorResolver,
  DirectorRelationsResolver,
  FindManyOfficerResolver,
  UpsertOneDirectorResolver,
  UpsertOneProfileResolver,
  FindUniqueProfileResolver,
  CreateOneVanityLinkResolver,
  UserRelationsResolver,
  FindManyApplicationResolver,
  FindManyFilledApplicationResolver,
  ApplicationRelationsResolver,
  FilledApplicationRelationsResolver,
  CreateOneFilledApplicationResolver,
  OfficerRelationsResolver,
  FindUniqueApplicationResolver,
  ProfileRelationsResolver,
  UpdateOneFilledApplicationResolver,
  CreateOneApplicationResolver,
  FindManyDivisionResolver,
  UpdateOneOfficerResolver,
} from '@generated/type-graphql';

export const exposedResolvers: NonEmptyArray<Function> = [
  FindManyProfileResolver,
  FindManyDirectorResolver,
  DirectorRelationsResolver,
  UpsertOneDirectorResolver,
  DeleteOneDirectorResolver,
  FindManyOfficerResolver,
  UserRelationsResolver,
  EventRelationsResolver,
  EventReservationRelationsResolver,
  FindManyTypeformApplicationResolver,
  FindFirstTypeformApplicationResolver,
  CreateOneTypeformApplicationResolver,
  UpdateOneTypeformApplicationResolver,
  DeleteOneTypeformApplicationResolver,
  FindManyApplicationResolver,
  CreateOneEventResolver,
  UpdateOneEventResolver,
  DeleteOneEventResolver,
  FindManyEventResolver,
  // DeleteProfileResolver,
  UpsertOneProfileResolver,
  FindUniqueProfileResolver,
  CreateOneVanityLinkResolver,
  FindManyFilledApplicationResolver,
  CreateOneFilledApplicationResolver,
  FindUniqueApplicationResolver,
  ApplicationRelationsResolver,
  FilledApplicationRelationsResolver,
  CreateOneFilledApplicationResolver,
  ProfileRelationsResolver,
  OfficerRelationsResolver,
  UpdateOneFilledApplicationResolver,
  CreateOneApplicationResolver,
  FindManyDivisionResolver,
  FindManyEventResolver,
  UpdateOneOfficerResolver,
];
