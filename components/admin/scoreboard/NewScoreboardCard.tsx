import PortalCard from 'components/PortalCard';

interface NewScoreboardCardProps {
  onClick: () => void;
}

export default function NewScoreboardCard({ onClick }: NewScoreboardCardProps) {
  return (
    <PortalCard width={300} height={200} onClick={onClick}>
      <div className="font-Gilroy text-lg text-white">add new card</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        width="6rem"
        className="mx-auto"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </PortalCard>
  );
}
