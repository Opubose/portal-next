import { GetMemberListQuery } from 'lib/generated/graphql';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from 'components/ui/table';
import { ScrollArea } from 'components/ui/scroll-area';
import { useEffect, useMemo, useState } from 'react';
import { Button } from 'components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from 'components/ui/pagination';
import debounce from 'lodash.debounce';
import Fuse from 'fuse.js';
import { Input } from 'components/ui/input';

const NUM_MEMBER_PER_PAGE = 20;

interface MemberManagementListProps {
  members: GetMemberListQuery['profiles'];
  handleMembershipUpdate: (profileId: string, membershipStatus: boolean) => Promise<void>;
}

export default function MemberManagementList({
  members,
  handleMembershipUpdate,
}: MemberManagementListProps) {
  const [filteredMembers, setFilteredMembers] = useState(members);
  const [searchQuery, setSearchQuery] = useState('');
  const debounceSearchQuery = useMemo(() => {
    return debounce((e) => setSearchQuery(e.target.value), 300);
  }, []);
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredMembers(members);
    } else {
      const fuse = new Fuse(members, {
        keys: ['firstName', 'lastName'],
      });
      setFilteredMembers(fuse.search(searchQuery).map((res) => res.item));
    }
  }, [searchQuery]);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    return () => debounceSearchQuery.cancel();
  });
  return (
    <div className="h-[770px] rounded-md border text-white p-5 ">
      <div className="my-2">
        <Input
          className="rounded-xl text-black"
          placeholder="Search for participant"
          onChange={debounceSearchQuery}
        />
      </div>
      <ScrollArea className="h-[620px] mb-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Name</TableHead>
              <TableHead className="w-1/3">Membership Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers
              .slice(NUM_MEMBER_PER_PAGE * (pageNumber - 1), NUM_MEMBER_PER_PAGE * pageNumber)
              .map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    {member.firstName} {member.lastName}
                  </TableCell>
                  <TableCell>{member.isMember ? 'yes' : 'no'}</TableCell>
                  <TableCell className="flex gap-x-3">
                    <Button
                      onClick={async () => {
                        await handleMembershipUpdate(member.id, !member.isMember);
                      }}
                      variant="secondary"
                    >
                      Toggle membership status
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <Pagination>
        <PaginationContent>
          {pageNumber > 1 && (
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>
          )}
          {pageNumber >= 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {pageNumber >= 2 && (
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => setPageNumber((prev) => prev - 1)}
              >
                {pageNumber - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink className="text-black cursor-pointer" isActive>
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
          {pageNumber + 1 <= Math.ceil(filteredMembers.length / NUM_MEMBER_PER_PAGE) && (
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => setPageNumber((prev) => prev + 1)}
              >
                {pageNumber + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {pageNumber + 2 <= Math.ceil(filteredMembers.length / NUM_MEMBER_PER_PAGE) && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {pageNumber + 1 <= Math.ceil(filteredMembers.length / NUM_MEMBER_PER_PAGE) && (
            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={() =>
                  setPageNumber((prev) =>
                    Math.min(prev + 1, Math.ceil(filteredMembers.length / NUM_MEMBER_PER_PAGE)),
                  )
                }
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
