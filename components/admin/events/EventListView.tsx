import { Input } from 'components/ui/input';
import { ScrollArea } from 'components/ui/scroll-area';
import { Table, TableBody, TableRow, TableCell } from 'components/ui/table';
import { GetAttendanceInfoQuery } from 'lib/generated/graphql';

interface EventListViewProps {
  onChangeSearchQuery: (e: any) => unknown;
  events: GetAttendanceInfoQuery['events'];
  onEventClick: (e: GetAttendanceInfoQuery['events'][0]) => void;
}

export default function EventListView({
  events,
  onEventClick,
  onChangeSearchQuery,
}: EventListViewProps) {
  return (
    <ScrollArea className="h-full rounded-md border text-white">
      <div className="px-4 pt-4">
        <Input
          className="rounded-xl p-3 text-black"
          placeholder="Search for an event"
          onChange={onChangeSearchQuery}
        />
      </div>
      <div className="px-4 pt-3">
        <Table>
          <TableBody>
            {events.map((e, idx) => (
              <TableRow className="cursor-pointer" onClick={() => onEventClick(e)} key={idx}>
                <TableCell className="font-medium">{e.summary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
}
