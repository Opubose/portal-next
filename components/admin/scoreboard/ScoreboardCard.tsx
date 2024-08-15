import { GetScoreboardsQuery } from 'lib/generated/graphql';
import PortalCard from 'components/PortalCard';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  return (
    <PortalCard
      width={300}
      height={200}
      onClick={() => router.push(`/admin/scoreboard/${scoreboard.id}`)}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="font-Gilroy text-lg text-white">{scoreboard.scoreboardName}</h1>
          <h1 className="font-Gilroy text-lg text-white">{scoreboard.division.deptName}</h1>
        </div>
        <div className="flex justify-end">
          <h1 className="font-Gilroy text-lg text-white">click for more details</h1>
        </div>
      </div>
    </PortalCard>
  );
}
