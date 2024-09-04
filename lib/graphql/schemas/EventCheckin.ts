import { Field, InputType, ObjectType } from 'type-graphql';

@InputType()
export class EventCheckinInput {
  @Field()
  public eventId!: string;

  @Field()
  public profileId!: string;
}

@ObjectType()
class PointClaimResult {
  @Field()
  public scoreboardName!: string;

  @Field()
  public scoreValue!: number;
}

@ObjectType()
export class EventCheckin {
  @Field()
  public eventId!: string;

  @Field()
  public profileId!: string;

  @Field(() => [PointClaimResult], { nullable: true })
  public points?: PointClaimResult[];
}
