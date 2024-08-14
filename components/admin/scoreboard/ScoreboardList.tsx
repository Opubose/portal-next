import { GetScoreboardsQuery } from 'lib/generated/graphql';
import NewScoreboardCard from './NewScoreboardCard';
import ScoreboardCard from './ScoreboardCard';

interface ScoreboardListProps {
  scoreboards: GetScoreboardsQuery['scoreboards'];
  handleNewScoreboardCreation: () => void;
}

export default function ScoreboardList({
  scoreboards,
  handleNewScoreboardCreation,
}: ScoreboardListProps) {
  return (
    <div className="grid grid-cols-3">
      {[
        <NewScoreboardCard onClick={handleNewScoreboardCreation} />,
        ...scoreboards.map((scoreboard) => <ScoreboardCard scoreboard={scoreboard} />),
      ]}
    </div>
  );
}
