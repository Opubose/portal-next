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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';

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
  const [deltaType, setDeltaType] = useState<'inc' | 'dec'>('inc');
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
            <div className="text-right text-sm">Increase/Decrease</div>
            <Select
              onValueChange={(value) => setDeltaType(value as typeof deltaType)}
              defaultValue={deltaType}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Increase / Decrease" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Update type</SelectLabel>
                  <SelectItem value="inc">Increase score by</SelectItem>
                  <SelectItem value="dec">Decrease score by</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Score
            </Label>
            <Input
              min={0}
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
              await onConfirmScoreUpdate(
                participant.participantId,
                deltaType === 'inc' ? delta : -delta,
              );
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
