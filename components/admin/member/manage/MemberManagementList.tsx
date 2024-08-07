import { GetMemberListQuery } from 'lib/generated/graphql';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from 'components/ui/table';
import { ScrollArea } from 'components/ui/scroll-area';
import { useEffect, useState } from 'react';
import { gqlQueries, queryClient } from 'src/api';
import Loading from 'components/Loading';
import { Button } from 'components/ui/button';

const NUM_MEMBER_PER_PAGE = 20;

interface MemberManagementListProps {
  pageNumber: number;
  handleMembershipUpdate: (profileId: string, membershipStatus: boolean) => Promise<void>;
}

export default function MemberManagementList({
  pageNumber,
  handleMembershipUpdate,
}: MemberManagementListProps) {
  const [componentLoading, setComponentLoading] = useState<boolean>(true);
  const [memberList, setMemberList] = useState<GetMemberListQuery['profiles']>([]);

  useEffect(() => {
    const cachedData: GetMemberListQuery | undefined = queryClient.getQueryData(
      `memberListPage${pageNumber}`,
    );
    if (cachedData !== undefined) {
      setMemberList(cachedData.profiles);
      return;
    }
    setComponentLoading(true);
    queryClient
      .fetchQuery({
        queryKey: `memberListPage${pageNumber}`,
        queryFn: () =>
          gqlQueries.getMemberList({
            skip: NUM_MEMBER_PER_PAGE * (pageNumber - 1),
            take: NUM_MEMBER_PER_PAGE,
          }),
      })
      .then((data) => {
        setMemberList(data.profiles);
        setComponentLoading(false);
      });
  }, [pageNumber]);

  if (componentLoading) return <Loading />;
  return (
    <ScrollArea className="h-[700px] rounded-md border text-white p-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Name</TableHead>
            <TableHead className="w-1/3">Membership Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {memberList.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                {member.firstName} {member.lastName}
              </TableCell>
              <TableCell>{member.user.isMember ? 'yes' : 'no'}</TableCell>
              <TableCell className="flex gap-x-3">
                <Button
                  onClick={async () => {
                    await handleMembershipUpdate(member.id, !member.user.isMember);
                  }}
                  variant="secondary"
                >
                  Toggle membership status
                </Button>
                {/* <MemberRemovalDialog */}
                {/*   onDeleteConfirmed={async () => { */}
                {/*     await handleMembershipUpdate(member.id, !member.user.isMember); */}
                {/*   }} */}
                {/* /> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
