import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { Label } from 'components/ui/label';
import { Input } from 'components/ui/input';
import { useState } from 'react';

interface ManualUserScoreUpdateDialogProps {
  participant: {
    participantId: string;
    firstName: string;
    lastName: string;
    netid: string;
    score: number;
  };
  onConfirmScoreUpdate: (participantId: string, scoreDelta: number) => Promise<void>;
}

export default function ManualUserScoreUpdateDialog({
  participant,
  onConfirmScoreUpdate,
}: ManualUserScoreUpdateDialogProps) {
  const [delta, setDelta] = useState(0);
  return (
    <Dialog>
      <DialogTrigger className="bg-green-400 rounded-lg p-3 text-white hover:bg-green-600">
        add/subtract score
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add/Subtract Score</DialogTitle>
          <DialogDescription>Update score for participant</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Score
            </Label>
            <Input
              value={delta}
              onChange={(e) => setDelta(parseInt(e.target.value))}
              type="number"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              await onConfirmScoreUpdate(participant.participantId, delta);
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
