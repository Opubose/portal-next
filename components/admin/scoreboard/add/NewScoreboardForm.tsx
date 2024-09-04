import { TextField, Select, MenuItem } from '@mui/material';
import PortalButton from 'components/Button';

interface ScoreboardRule {
  eventCategoryId: string;
  maxClaimCount: number;
  scoreValue: number;
  maxClaimEnabled: boolean;
}

interface NewScoreboardFormProps {
  onSubmitForm: () => Promise<void>;
  onAddRule: () => void;
  onRemoveRule: (idx: number) => void;
  scoreboardUpdateHandler: {
    updateEventCategoryId: (ruleIndex: number, value: string) => void;
    updateMaxClaimCount: (ruleIndex: number, value: number) => void;
    updateScoreValue: (ruleIndex: number, value: number) => void;
    toggleMaxClaimEnabled: (ruleIndex: number) => void;
    updateScoreboardName: (newScoreboardName: string) => void;
    updateDivision: (divisionId: string) => void;
  };
  scoreboardData: {
    scoreboardName: string;
    divisionId: string;
    scoreRules: ScoreboardRule[];
  };
  divisionList: Array<{ id: string; deptName: string }>;
  eventCategories: Array<{ id: string; eventCategoryName: string }>;
}

export default function NewScoreboardForm({
  onSubmitForm,
  onAddRule,
  onRemoveRule,
  scoreboardUpdateHandler,
  scoreboardData,
  divisionList,
  eventCategories,
}: NewScoreboardFormProps) {
  return (
    <div className="p-5 flex flex-col gap-y-10 items-center w-3/5 mx-auto">
      <TextField
        variant="outlined"
        label="Scoreboard Name"
        value={scoreboardData.scoreboardName}
        onChange={(e) => {
          scoreboardUpdateHandler.updateScoreboardName(e.target.value);
        }}
        sx={{
          '& .MuiInputBase-input': {
            color: 'white',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
            color: 'white',
          },
          '& .MuiFormLabel-root': {
            color: 'white',
          },
          '& .MuiSelect-select': {
            color: 'white',
          },
        }}
        fullWidth
      />
      <Select
        label="Division"
        variant="outlined"
        defaultValue={''}
        value={scoreboardData.divisionId}
        onChange={(e) => {
          scoreboardUpdateHandler.updateDivision(e.target.value);
        }}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '& .MuiInputBase-input': {
            color: 'white',
          },
          '& .MuiFormLabel-root': {
            color: 'white',
          },
          '& .MuiSelect-icon': {
            color: 'white',
          },
        }}
        fullWidth
      >
        <MenuItem value={''}>Choose a division</MenuItem>
        {divisionList.map((division) => (
          <MenuItem value={division.id}>{division.deptName}</MenuItem>
        ))}
      </Select>
      {scoreboardData.scoreRules.map((rule, idx) => (
        <div className="rounded-lg p-5 border-2 flex justify-around items-center w-full">
          <h1 className="text-white text-lg">Rule #{idx + 1}</h1>
          <div className="flex flex-row w-3/5 gap-x-4">
            <Select
              label="Event Type"
              variant="outlined"
              defaultValue={''}
              value={rule.eventCategoryId}
              onChange={(e) => {
                scoreboardUpdateHandler.updateEventCategoryId(idx, e.target.value);
              }}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                '& .MuiFormLabel-root': {
                  color: 'white',
                },
                '& .MuiSelect-icon': {
                  color: 'white',
                },
              }}
              fullWidth
            >
              <MenuItem value={''}>Choose a event type</MenuItem>
              {eventCategories.map((category) => (
                <MenuItem value={category.id}>{category.eventCategoryName}</MenuItem>
              ))}
            </Select>
            <TextField
              type="number"
              variant="outlined"
              label="Score Value"
              value={rule.scoreValue}
              onChange={(e) => {
                scoreboardUpdateHandler.updateScoreValue(idx, parseInt(e.target.value));
              }}
              sx={{
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                  color: 'white',
                },
                '& .MuiFormLabel-root': {
                  color: 'white',
                },
                '& .MuiSelect-select': {
                  color: 'white',
                },
              }}
              fullWidth
            />
          </div>
          <PortalButton onClick={() => onRemoveRule(idx)}>delete rule</PortalButton>
        </div>
      ))}
      <div className="flex justify-end gap-x-3">
        <PortalButton onClick={() => onAddRule()}>add new rule</PortalButton>
        <PortalButton
          onClick={async () => {
            await onSubmitForm();
          }}
        >
          create scoreboard
        </PortalButton>
      </div>
    </div>
  );
}
