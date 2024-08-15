import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
} from '@mui/material';

interface ScoreboardParticipantsTableProps {
  participants: Array<{
    participantId: string;
    firstName: string;
    lastName: string;
    netid: string;
  }>;
}

export default function ScoreboardParticipantsTable({
  participants,
}: ScoreboardParticipantsTableProps) {
  if (participants.length === 0)
    return (
      <div className="p-3 border-2 rounded-xl">
        <h1 className="text-xl text-white">No participants found!</h1>
      </div>
    );
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>NetID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participants.map((participant) => (
            <TableRow
              key={participant.participantId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {participant.firstName}
              </TableCell>
              <TableCell>{participant.lastName}</TableCell>
              <TableCell>{participant.netid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
