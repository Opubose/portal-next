import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingComponent from 'components/LoadingComponent';
import ErrorComponent from 'components/ErrorComponent';
import SuccessfulComponent from 'components/SuccessfulComponent';
import { useSession } from 'next-auth/react';
import { gqlQueries } from 'src/api';
import { useQuery } from '@tanstack/react-query';
import { GraphQLError } from 'graphql';
import Loading from 'components/Loading';
import Link from 'next/link';

function ViewWrapper({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col gap-y-3">
      {children}
      <Link
        className="bg-none dark:text-white text-black text-2xl hover:scale-105 transition-all ease-in-out hover:shadow-[inset_13rem_0_0_0] hover:shadow-violet-400 duration-[300ms,600ms] w-52 py-2"
        href="/events"
      >
        click here to return to events
      </Link>
    </div>
  );
}

export default function CheckinPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { status } = useSession({ required: true });

  const { data, error, isLoading } = useQuery({
    queryKey: ['checkInData'],
    queryFn: async () => {
      return await gqlQueries.getCheckInPageUserInfo();
    },
    enabled: status === 'authenticated',
  });

  const [queryError, setQueryError] = useState<GraphQLError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isLoading) return;
    setLoading(false);
    if (error) {
      setQueryError(error as GraphQLError);
      return;
    }
    if (!data!.me.profile) {
      setQueryError(
        new GraphQLError('Profile does not exist', {
          extensions: {
            code: 'PROFILE_DOES_NOT_EXIST',
          },
        }),
      );
      return;
    }

    gqlQueries.checkInToEvent({
      checkInData: {
        eventId: slug as string,
        profileId: data!.me.profile.id,
      },
    });
  }, [isLoading, error, data]);

  if (isLoading || status == 'loading') return <Loading />;
  if (loading) {
    return <LoadingComponent />;
  }
  if (queryError) {
    return (
      <ViewWrapper>
        <ErrorComponent
          errorCode={queryError.extensions.code as string}
          errorMessage={queryError.message}
        />
      </ViewWrapper>
    );
  }

  return (
    <ViewWrapper>
      <SuccessfulComponent message="Check-in successful" />
    </ViewWrapper>
  );
}
