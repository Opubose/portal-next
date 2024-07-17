import { ScrollArea } from 'components/ui/scroll-area';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from 'components/ui/table';
import { GetAttendanceInfoQuery } from 'lib/generated/graphql';

interface EventParticipantListViewProps {
  currentEvent: GetAttendanceInfoQuery['events'][0] | null;
}

export default function EventParticipantListView({ currentEvent }: EventParticipantListViewProps) {
  return (
    <ScrollArea className="h-full rounded-md border text-white">
      {currentEvent === null ? (
        <div className="text-white p-5">
          <h1>Choose any event to view its statistics attendance.</h1>
        </div>
      ) : (
        <div className="p-5">
          {currentEvent.profiles.length === 0 ? (
            <h1>This event does not have any attendance</h1>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEvent.profiles.map(({ profile }) => (
                  <TableRow>
                    <TableCell>{profile.firstName}</TableCell>
                    <TableCell>{profile.lastName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </ScrollArea>
  );
}
