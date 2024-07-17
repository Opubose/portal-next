import { ScrollArea } from 'components/ui/scroll-area';
import { Table, TableBody, TableRow, TableCell } from 'components/ui/table';
import { GetAttendanceInfoQuery } from 'lib/generated/graphql';

interface EventListViewProps {
  events: GetAttendanceInfoQuery['events'];
  onEventClick: (e: GetAttendanceInfoQuery['events'][0]) => void;
}

export default function EventListView({ events, onEventClick }: EventListViewProps) {
  return (
    <ScrollArea className="h-full rounded-md border text-white">
      <div className="p-4">
        <Table>
          <TableBody>
            {events.map((e) => (
              <TableRow className="cursor-pointer" onClick={() => onEventClick(e)} key={e.summary}>
                <TableCell className="font-medium">{e.summary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
}
