import { Button } from 'components/ui/button';
import Loading from 'components/Loading';
import AdminOnlyComponent from 'components/admin/AdminOnly';
import MemberManagementList from 'components/admin/member/manage/MemberManagementList';
import PageTitle from 'components/admin/member/manage/PageTitle';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { gqlQueries } from 'src/api';

export default function MemberManagementPage() {
  const { status } = useSession({ required: true });
  const router = useRouter();
  const officerData = useContext(OfficerStatusContext);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const handleMembershipToggle = async (profileId: string, membershipStatus: boolean) => {
    try {
      await gqlQueries.toggleMembershipStatus({
        profileId,
        membershipStatus,
      });
      alert('Membership status updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update membership status. Please try again later...');
    }
  };

  if (!officerData.isDirector) return <AdminOnlyComponent />;
  if (status === 'loading') return <Loading />;
  return (
    <div className="p-5">
      <PageTitle handleGoBack={() => router.push('/admin')} />
      <MemberManagementList
        pageNumber={pageNumber}
        handleMembershipUpdate={async (profileId, membershipStatus) =>
          handleMembershipToggle(profileId, membershipStatus)
        }
      />
      <div className="flex justify-end items-center my-3 gap-x-3">
        {pageNumber > 1 && (
          <Button onClick={() => setPageNumber((prev) => prev - 1)} variant="secondary">
            Previous page
          </Button>
        )}
        <Button onClick={() => setPageNumber((prev) => prev + 1)} variant="secondary">
          Next page
        </Button>
      </div>
    </div>
  );
}
