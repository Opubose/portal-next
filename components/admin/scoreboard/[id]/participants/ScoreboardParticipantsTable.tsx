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
    score: number;
  }>;
  removeUserFromScoreboardHandler: (participantId: string) => Promise<void>;
}

export default function ScoreboardParticipantsTable({
  participants,
  removeUserFromScoreboardHandler,
}: ScoreboardParticipantsTableProps) {
  if (participants.length === 0)
    return (
      <div className="p-3 border-2 rounded-xl">
        <h1 className="text-xl text-white">No participants found!</h1>
      </div>
    );
  const sortedParticipants = participants
    .sort((a, b) => b.score - a.score)
    .reduce((acc: Array<(typeof participants)[0] & { rank: number }>, curr) => {
      if (acc.length === 0) return [...acc, { ...curr, rank: 1 }];
      if (curr.score < acc[acc.length - 1].score)
        return [...acc, { ...curr, rank: acc.length + 1 }];
      return [...acc, { ...curr, rank: acc[acc.length - 1].rank }];
    }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>NetID</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedParticipants.map((participant) => (
            <TableRow
              key={participant.participantId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {participant.rank}
              </TableCell>
              <TableCell>{participant.firstName}</TableCell>
              <TableCell>{participant.lastName}</TableCell>
              <TableCell>{participant.netid}</TableCell>
              <TableCell>{participant.score}</TableCell>
              <TableCell>
                <button
                  className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-600"
                  onClick={async () => {
                    await removeUserFromScoreboardHandler(participant.participantId);
                  }}
                >
                  remove this user from the scoreboard
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
