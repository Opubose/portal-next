import Loading from 'components/Loading';
import AdminOnlyComponent from 'components/admin/AdminOnly';
import ScoreboardInfoForm from 'components/admin/scoreboard/[id]/ScoreboardInfoForm';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { gqlQueries } from 'src/api';

export default function ScoreboardMangementPage() {
  const { status } = useSession({ required: true });
  const officerStatusData = useContext(OfficerStatusContext);
  const router = useRouter();
  const { data, isLoading, error } = useQuery([`scoreboard${router.query.id}`], () =>
    gqlQueries.getScoreboardByIdPageData({
      where: {
        id: router.query.id as string,
      },
    }),
  );

  if (isLoading || status === 'loading') {
    return <Loading />;
  }
  if (!data?.scoreboard || !officerStatusData.isDirector) {
    return <AdminOnlyComponent />;
  }

  return (
    <div className="p-5 w-full">
      <h1 className="text-2xl text-white">Manage {data.scoreboard.scoreboardName}</h1>
      <ScoreboardInfoForm
        divisionList={data!.me.profile!.officer!.divisions}
        scoreboardData={{
          scoreboardName: data!.scoreboard!.scoreboardName,
          divisionId: data!.scoreboard!.division.id,
          scoreRules: data!.scoreboard!.scoreRules.map((rule) => ({
            eventCategoryId: rule.eventCategory.id,
            maxClaimCount: 0,
            maxClaimEnabled: false,
            scoreValue: rule.scoreValue,
          })),
        }}
        onManageParticipant={async () => {
          await router.push(`/admin/scoreboard/${router.query.id as string}/participants`);
        }}
        onGoBack={async () => {
          await router.push('/admin/scoreboard/');
        }}
        eventCategories={data!.eventCategories}
      />
    </div>
  );
}
