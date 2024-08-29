import ErrorComponent from 'components/ErrorComponent';
import Loading from 'components/Loading';
import AdminOnlyComponent from 'components/admin/AdminOnly';
import DirectorManagementList from 'components/admin/director/manage/DirectorManagementList';
import PageTitle from 'components/admin/director/manage/PageTitle';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import Button from 'components/Button';
import { GraphQLError } from 'graphql';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { gqlQueries } from 'src/api';

export default function DirectorManagementPage() {
  const { status } = useSession({ required: true });
  const router = useRouter();
  const officerData = useContext(OfficerStatusContext);
  const isDevDirectorOrExecutive =
    officerData.directorOfDivisions.indexOf('Development') !== -1 ||
    officerData.directorOfDivisions.indexOf('Executive') !== -1;
  const { data, isLoading, error } = useQuery(
    ['directorData'],
    () => gqlQueries.getDirectorManagementPageInfo(),
    { enabled: status === 'authenticated' && officerData.isDirector && isDevDirectorOrExecutive },
  );

  if (!officerData.isDirector || !isDevDirectorOrExecutive) return <AdminOnlyComponent />;
  if (isLoading || status === 'loading') return <Loading />;

  const removeDirectorHandler = async (directorId: string) => {
    try {
      await gqlQueries.deleteDirector({
        where: {
          id: directorId,
        },
      });
      alert('Successfully removed director');
    } catch (error) {
      console.error(error);
      alert('Error removing director. Please try again later...');
    }
  };

  if (error) {
    console.error(error);
    return (
      <ErrorComponent
        errorCode={(error as GraphQLError).extensions.code as string}
        errorMessage={(error as GraphQLError).message}
      />
    );
  }

  return (
    <div className="p-5">
      <PageTitle handleGoBack={() => router.push('/admin')} />
      <DirectorManagementList
        directors={data!.directors}
        handleDirectorRemoval={async ({ id }) => removeDirectorHandler(id)}
      />
      <div className="flex justify-end my-4">
        <Button onClick={() => router.push('/admin/director/add')}>add new director</Button>
      </div>
    </div>
  );
}
