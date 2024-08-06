import { GetDirectorManagementPageInfoQuery } from 'lib/generated/graphql';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from 'components/ui/table';
import { ScrollArea } from 'components/ui/scroll-area';
import DirectorRemovalDialog from './DirectorRemovalDialog';

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
  return (
    <ScrollArea className="h-[700px] rounded-md border text-white p-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Name</TableHead>
            <TableHead className="w-1/3">Divisions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {directors.map((director) => (
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
