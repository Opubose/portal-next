import { GetDirectorManagementPageInfoQuery } from 'lib/generated/graphql';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from 'components/ui/table';
import { ScrollArea } from 'components/ui/scroll-area';
import DirectorRemovalDialog from './DirectorRemovalDialog';
import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import Fuse from 'fuse.js';
import { Input } from 'components/ui/input';

interface DirectorManagementListProps {
  directors: GetDirectorManagementPageInfoQuery['directors'];
  handleDirectorRemoval: (
    director: GetDirectorManagementPageInfoQuery['directors'][0],
  ) => Promise<void>;
}

export default function DirectorManagementList({
  directors,
  handleDirectorRemoval,
}: DirectorManagementListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDirectors, setFilteredDirectors] =
    useState<GetDirectorManagementPageInfoQuery['directors']>(directors);
  const debounceSearchQuery = useMemo(() => {
    return debounce((e) => setSearchQuery(e.target.value), 300);
  }, []);
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredDirectors(directors);
    } else {
      const fuse = new Fuse(directors, {
        keys: ['officer.profile.firstName', 'officer.profile.lastName'],
      });
      const result = fuse.search(searchQuery);
      setFilteredDirectors(result.map((data) => data.item));
    }
  }, [searchQuery]);
  useEffect(() => {
    return () => {
      debounceSearchQuery.cancel();
    };
  });
  return (
    <ScrollArea className="h-[700px] rounded-md border text-white p-5">
      <div className="p-4">
        <Input
          className="rounded-xl p-3 text-black"
          placeholder="Search director"
          onChange={debounceSearchQuery}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Name</TableHead>
            <TableHead className="w-1/3">Divisions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDirectors.map((director) => (
            <TableRow key={director.id}>
              <TableCell>
                {director.officer!.profile.firstName} {director.officer!.profile.lastName}
              </TableCell>
              <TableCell>{director.divisions.map((d) => d.deptName).join(',')}</TableCell>
              <TableCell className="flex gap-x-3">
                <DirectorRemovalDialog
                  onDeleteConfirmed={async () => {
                    await handleDirectorRemoval(director);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
