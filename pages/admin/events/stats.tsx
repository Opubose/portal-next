import ErrorComponent from 'components/ErrorComponent';
import Loading from 'components/Loading';
import AdminOnlyComponent from 'components/admin/AdminOnly';
import EventListView from 'components/admin/events/EventListView';
import EventParticipantListView from 'components/admin/events/EventParticipantListView';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { GraphQLError } from 'graphql';
import { GetAttendanceInfoQuery } from 'lib/generated/graphql';
import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { gqlQueries } from 'src/api';
import StatsPageTitle from 'components/admin/events/StatsPageTitle';
import { useRouter } from 'next/router';
import EventSummaryView from 'components/admin/events/EventSummaryView';

export default function EventStatsPage() {
  const { status } = useSession({ required: true });
  const router = useRouter();
  const officerData = useContext(OfficerStatusContext);
  const { data, isLoading, error } = useQuery(['attendanceData'], () =>
    gqlQueries.getAttendanceInfo(),
  );
  const [currentEvent, setCurrentEvent] = useState<GetAttendanceInfoQuery['events'][0] | null>(
    null,
  );

  if (!officerData.isDirector) return <AdminOnlyComponent />;
  if (isLoading || status === 'loading') return <Loading />;

  if (error) {
    console.error(error);
    return (
      <ErrorComponent
        errorCode={(error as GraphQLError).extensions.code as string}
        errorMessage={(error as GraphQLError).message}
      />
    );
  }

  return (
    <div className="p-5 flex flex-col gap-y-4">
      <StatsPageTitle handleGoBack={() => router.push('/admin')} />
      <div className="grid grid-cols-4 grid-rows-7 gap-4 h-[700px]">
        <div className="col-start-1 row-start-1 row-span-7 col-span-1">
          <EventListView events={data!.events} onEventClick={(e) => setCurrentEvent(e)} />
        </div>
        {currentEvent !== null && (
          <div className="col-start-2 row-start-1 row-span-1 col-span-3">
            <EventSummaryView currentEvent={currentEvent} />
          </div>
        )}
        <div
          className={`col-start-2 ${
            currentEvent === null ? 'row-start-1 row-span-7' : 'row-start-2 row-span-6'
          } col-span-3`}
        >
          <EventParticipantListView currentEvent={currentEvent} />
        </div>
      </div>
    </div>
  );
}
