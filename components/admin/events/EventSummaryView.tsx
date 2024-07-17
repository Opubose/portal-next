import { GetAttendanceInfoQuery } from 'lib/generated/graphql';
import { useMemo } from 'react';
import dayjs from 'dayjs';

interface EventSummaryViewProps {
  currentEvent: GetAttendanceInfoQuery['events'][0] | null;
}

export default function EventSummaryView({ currentEvent }: EventSummaryViewProps) {
  if (!currentEvent) return <></>;
  const statsCardParams = useMemo(
    () => [
      {
        statsName: 'Number of participants',
        statsValue: currentEvent.profiles.length,
      },
      {
        statsName: 'Start Date',
        statsValue: dayjs(currentEvent.start).format('ddd MMM DD YYYY'),
      },
      {
        statsName: 'End Date',
        statsValue: dayjs(currentEvent.end).format('ddd MMM DD YYYY'),
      },
    ],
    [currentEvent],
  );
  return (
    <div className="text-white h-full w-full flex gap-x-3">
      {statsCardParams.map((param) => (
        <div className="text-white py-3 px-5 flex flex-col justify-between h-full w-1/3 border rounded-md">
          <h1 className="text-xl font-bold">{param.statsName}</h1>
          <h1 className="text-lg">{param.statsValue}</h1>
        </div>
      ))}
    </div>
  );
}
