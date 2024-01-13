import { NonEmptyArray } from 'type-graphql';

import {
  CreateOneAccountResolver,
  UpdateOneAccountResolver,
  DeleteOneAccountResolver,
  UpsertOneAccountResolver,
  FindManyTypeformApplicationResolver,
  FindFirstTypeformApplicationResolver,
  CreateOneTypeformApplicationResolver,
  UpdateOneTypeformApplicationResolver,
  DeleteOneTypeformApplicationResolver,
  CreateOneEventResolver,
  UpdateOneEventResolver,
  DeleteOneEventResolver,
  UpsertOneEventResolver,
  FindManyEventResolver,
  CreateOneProfileResolver,
  UpdateOneProfileResolver,
  // DeleteProfileResolver,
  UpsertOneProfileResolver,
  FindManyProfileResolver,
  FindUniqueProfileResolver,
  CreateOneEventReservationResolver,
  UpdateOneEventReservationResolver,
  DeleteOneEventReservationResolver,
  UpsertOneEventReservationResolver,
  FindManyEventReservationResolver,
  CreateOneVanityLinkResolver,
  UpdateOneVanityLinkResolver,
  DeleteOneVanityLinkResolver,
  FindManyVanityLinkResolver,
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
  UpdateOneOfficerResolver
} from '@generated/type-graphql';

export const exposedResolvers: NonEmptyArray<Function> = [
  UserRelationsResolver,
  CreateOneAccountResolver,
  UpdateOneAccountResolver,
  DeleteOneAccountResolver,
  UpsertOneAccountResolver,
  FindManyTypeformApplicationResolver,
  FindFirstTypeformApplicationResolver,
  CreateOneTypeformApplicationResolver,
  UpdateOneTypeformApplicationResolver,
  DeleteOneTypeformApplicationResolver,
  FindManyApplicationResolver,
  CreateOneEventResolver,
  UpdateOneEventResolver,
  DeleteOneEventResolver,
  UpsertOneEventResolver,
  FindManyEventResolver,
  CreateOneProfileResolver,
  UpdateOneProfileResolver,
  // DeleteProfileResolver,
  UpsertOneProfileResolver,
  FindManyProfileResolver,
  FindUniqueProfileResolver,
  CreateOneEventReservationResolver,
  UpdateOneEventReservationResolver,
  DeleteOneEventReservationResolver,
  UpsertOneEventReservationResolver,
  FindManyEventReservationResolver,
  CreateOneVanityLinkResolver,
  UpdateOneVanityLinkResolver,
  DeleteOneVanityLinkResolver,
  FindManyVanityLinkResolver,
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
  UpdateOneOfficerResolver
];  
