import { MiddlewareFn } from 'type-graphql';
import { TContext } from '../interfaces/context.interface';
import { getSession } from 'next-auth/react';
import { GraphQLError } from 'graphql';

export const onlyExecutiveAndDevDirectorAllowed: MiddlewareFn<TContext> = async (
  { context },
  next,
) => {
  const session = await getSession(context);
  if (!session) {
    throw new GraphQLError('Login required', {
      extensions: {
        code: 'LOGIN_REQUIRED',
      },
    });
  }
  const directorData = await context.prisma.director.findFirst({
    where: {
      officer: {
        profile: {
          userId: session.id,
        },
      },
    },
    include: {
      divisions: true,
    },
  });
  if (
    !directorData ||
    !directorData.divisions.some(
      (division) => division.deptName === 'Executive' || division.deptName === 'Development',
    )
  ) {
    throw new GraphQLError('User is not director', {
      extensions: {
        code: 'USER_ACCESS_RESTRICTED',
      },
    });
  }
  return next();
};
