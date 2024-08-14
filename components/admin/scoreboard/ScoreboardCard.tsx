import { GetScoreboardsQuery } from 'lib/generated/graphql';
import PortalCard from 'components/PortalCard';
import Image from 'next/image';

interface ScoreboardCardProps {
  scoreboard: GetScoreboardsQuery['scoreboards'][0];
}

const divisionSvgMapping: Record<string, string> = {
  Community: 'community.svg',
  Development: 'development.svg',
  Education: 'education.svg',
  HackUTD: 'hackUTD_new.svg',
  Industry: 'industry.svg',
  Media: 'media.svg',
  Projects: 'projects.svg',
  Research: 'research.svg',
};

export default function ScoreboardCard({ scoreboard }: ScoreboardCardProps) {
  return (
    <PortalCard width={300} height={200}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="font-Gilroy text-lg text-white">{scoreboard.scoreboardName}</h1>
          <h1 className="font-Gilroy text-lg text-white">{scoreboard.division.deptName}</h1>
        </div>
        <div className="flex justify-end">
          <h1 className="font-Gilroy text-lg text-white">click to edit scoreboard</h1>
        </div>
      </div>
    </PortalCard>
  );
}
