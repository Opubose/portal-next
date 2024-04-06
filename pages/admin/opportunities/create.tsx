import LoadingComponent from 'components/LoadingComponent';
import AdminOnlyComponent from 'components/admin/AdminOnly';
import CreateApplicationForm from 'components/applications/CreateApplicationForm';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { gqlQueries } from 'src/api';

export default function CreateApplicationPage() {
  const router = useRouter();
  const isOfficer = useContext(OfficerStatusContext);
  const { status } = useSession({ required: true });
  const { data, isLoading, error } = useQuery({
    queryKey: ['getDivisionData'],
    queryFn: () => gqlQueries.getDivisionData(),
    enabled: status === 'authenticated',
  });

  if (!isOfficer) return <AdminOnlyComponent />;

  if (isLoading) return <LoadingComponent />;

  if (!data || !data.divisions) {
    console.error(error);
    return <div>Something is wrong. Please try again later...</div>;
  }

  return (
    <div className="px-16 py-[65px] w-full">
      <header className="flex items-center justify-center relative mb-[30px]">
        <h1 className="text-[48px] font-Gilroy text-white font-semibold">applications</h1>
      </header>

      <div className="w-full grid place-items-center">
        <div className="flex flex-col p-10 place-items-center">
          <div className="text-2xl font-semibold text-gray-100">Create Application</div>
        </div>
        <div className="w-full flex justify-center">
          <CreateApplicationForm divisions={data.divisions} />
        </div>
        <div className="flex gap-20">
          <button
            type="submit"
            className="bg-purple-600 text-gray-100 font-semibold px-12 py-2 rounded-lg"
            form="create-application-form"
            onClick={() => {
              sessionStorage.setItem('showToast', '1');
            }}
          >
            save
          </button>
          <button
            className="text-gray-100 font-semibold p-2 rounded-lg"
            onClick={(e) => {
              e.preventDefault();
              router.push('/admin');
            }}
          >
            cancel
          </button>
        </div>
      </div>
      <div className="flex gap-x-16 px-16 justify-center"></div>
    </div>
  );
}
