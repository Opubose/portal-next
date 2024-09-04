import { useSession } from 'next-auth/react';
import Button from 'components/Button';
import { useRouter } from 'next/router';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { useContext } from 'react';
import AdminOnlyComponent from 'components/admin/AdminOnly';

interface AdminFunctionalityOptionType {
  title: string;
  description: string;
  onChosen: () => void;
  directorOnly: boolean;
  // flag is true if functionality is reserved for either ACM executive or Development Director only
  devDirectorOrExecOnly: boolean;
}

export default function AdminToolsPage() {
  useSession({ required: true });
  const router = useRouter();
  const officerStatusData = useContext(OfficerStatusContext);
  const options: AdminFunctionalityOptionType[] = [
    {
      title: 'Create Vanity Link',
      description: 'Click here to start creating your Vanity URL with ACM domain.',
      onChosen: () => router.push('/admin/vanity'),
      directorOnly: false,
      devDirectorOrExecOnly: false,
    },
    {
      title: 'View events statistics',
      description: 'Click here to view participation metrics of ACM events.',
      onChosen: () => router.push('/admin/events/stats'),
      directorOnly: true,
      devDirectorOrExecOnly: false,
    },
    {
      title: 'Add officer to division',
      description: 'Add new officer into division.',
      onChosen: () => router.push('/admin/officer/add'),
      directorOnly: true,
      devDirectorOrExecOnly: false,
    },
    {
      title: 'Manage Membership Status',
      description: 'Click here to manage membership of ACM Portal users',
      onChosen: () => router.push('/admin/member/manage'),
      directorOnly: true,
      devDirectorOrExecOnly: true,
    },
    {
      title: 'Manage Scoreboard',
      description: 'Manage Scoreboard owned by your division',
      onChosen: () => router.push('/admin/scoreboard/'),
      directorOnly: true,
      devDirectorOrExecOnly: false,
    },
    // {
    //   title: 'Create Division Application',
    //   description: 'Click here to create new application for your division',
    //   onChosen: () => router.push('/admin/opportunities/create'),
    //   directorOnly: true
    // },
    {
      title: 'Manage Director',
      description: 'Manage Director',
      onChosen: () => router.push('/admin/director/manage'),
      directorOnly: true,
      devDirectorOrExecOnly: true,
    },
    {
      title: 'Manage Typeform Application',
      description: 'Click here to manage all Typeform application',
      onChosen: () => router.push('/admin/typeform/'),
      directorOnly: true,
      devDirectorOrExecOnly: false,
    },
    {
      title: 'Add Event',
      description: 'Click here to create an event for your division(s)',
      onChosen: () => router.push('/admin/events/add'),
      directorOnly: false,
      devDirectorOrExecOnly: false,
    },
    {
      title: 'Edit Events',
      description: 'Click here to edit recent event data',
      onChosen: () => router.push('/admin/events/edit'),
      directorOnly: false,
      devDirectorOrExecOnly: false,
    },
    {
      title: 'Add participant into division',
      description: 'Click here to add participant into your division',
      onChosen: () => router.push('/admin/participant/add'),
      directorOnly: true,
      devDirectorOrExecOnly: false,
    },
  ];
  const isDevDirectorOrExec = () => {
    return (
      officerStatusData.directorOfDivisions.includes('Development') ||
      officerStatusData.directorOfDivisions.includes('Executive')
    );
  };
  if (!officerStatusData.isOfficer) {
    return <AdminOnlyComponent />;
  }
  return (
    <div className="p-4">
      <h1 className="text-[40px] text-white my-5 py-3">Admin Tools</h1>
      <div className="flex flex-col gap-y-6 w-full">
        {options
          .filter(({ directorOnly }) => (officerStatusData.isDirector ? true : !directorOnly))
          .filter(({ devDirectorOrExecOnly }) =>
            isDevDirectorOrExec() ? true : !devDirectorOrExecOnly,
          )
          .map(({ title, description, onChosen }, idx) => (
            <div
              key={idx}
              className="mx-auto w-4/5 lg:h-40 p-6 rounded-3xl gap-y-4 flex flex-col justify-around bg-gray-200/5 outline outline-gray-100/10"
            >
              <h2 className="text-white font-bold text-xl">{title}</h2>
              <p className="text-white">{description}</p>
              <Button onClick={onChosen} className="ml-auto">
                Select
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
