import { Button } from 'components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';

interface DirectorRemovalDialogProps {
  onDeleteConfirmed: () => Promise<void>;
}

export default function DirectorRemovalDialog({ onDeleteConfirmed }: DirectorRemovalDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">remove this director</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove director</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <p className="text-md">
          Are you sure you want to remove director permission for this person? This action cannot be
          undone.
        </p>
        <DialogFooter>
          <Button
            onClick={async () => {
              await onDeleteConfirmed();
            }}
            variant="destructive"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
