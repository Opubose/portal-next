import { Field, InputType } from 'type-graphql';

@InputType()
export class ScoreboardResetInput {
  @Field()
  public scoreboardId!: string;
}
