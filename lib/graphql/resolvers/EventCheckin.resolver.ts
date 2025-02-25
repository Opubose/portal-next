import { injectable } from 'tsyringe';
import { Arg, Resolver, Mutation, Ctx, UseMiddleware } from 'type-graphql';
import EventCheckinService from '../services/EventCheckin.service';
import { EventCheckin, EventCheckinInput } from '../schemas/EventCheckin';
import type { TContext } from '../interfaces/context.interface';
import { checkValidEvent } from '../middlewares/check-valid-event';
import { getSession } from 'next-auth/react';
import { GraphQLError } from 'graphql';
import { onlyEventOwner } from '../middlewares/only-event-owner';
import { scoreUpdateAfterCheckIn } from '../middlewares/score-update';

@Resolver(() => EventCheckin)
@injectable()
export default class EventCheckinResolver {
  constructor(private EventCheckinService: EventCheckinService) {}

  @Mutation(() => EventCheckin)
  @UseMiddleware([checkValidEvent, onlyEventOwner, scoreUpdateAfterCheckIn])
  async checkinToEvent(
    @Arg('options', () => EventCheckinInput) options: EventCheckinInput,
    @Ctx() context: TContext,
  ) {
    return this.EventCheckinService.checkInEvent(options, context);
  }
}
