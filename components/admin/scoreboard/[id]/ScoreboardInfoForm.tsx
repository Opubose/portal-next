import { TextField, Select, MenuItem } from '@mui/material';
import PortalButton from 'components/Button';

interface ScoreboardRule {
  eventCategoryId: string;
  maxClaimCount: number;
  scoreValue: number;
  maxClaimEnabled: boolean;
}

interface UpdateScoreboardFormProps {
  onManageParticipant: () => Promise<void>;
  onGoBack: () => Promise<void>;
  scoreboardData: {
    scoreboardName: string;
    divisionId: string;
    scoreRules: ScoreboardRule[];
  };
  divisionList: Array<{ id: string; deptName: string }>;
  eventCategories: Array<{ id: string; eventCategoryName: string }>;
}

export default function UpdateScoreboardForm({
  scoreboardData,
  divisionList,
  eventCategories,
  onManageParticipant,
  onGoBack,
}: UpdateScoreboardFormProps) {
  return (
    <div className="p-5 flex flex-col gap-y-10 items-center w-3/5 mx-auto">
      <TextField
        disabled
        variant="outlined"
        label="Scoreboard Name"
        value={scoreboardData.scoreboardName}
        sx={{
          '& .MuiInputBase-input': {
            color: 'white',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white !important',
          },
          '& .MuiFormLabel-root': {
            color: 'white !important',
          },
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: '#FFFFFF',
          },
        }}
        fullWidth
      />
      <Select
        disabled
        label="Division"
        variant="outlined"
        defaultValue={''}
        value={scoreboardData.divisionId}
        sx={{
          '& .MuiInputBase-input': {
            color: 'white',
          },
          '& .MuiFormLabel-root': {
            color: 'white',
          },
          '& .MuiSelect-icon': {
            color: 'white',
          },
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: '#FFFFFF',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white !important',
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
        <div className="rounded-lg p-5 border-2 flex flex-col w-full gap-y-4">
          <h1 className="text-white text-lg">Rule #{idx + 1}</h1>
          <div className="flex justify-around items-center w-3/5">
            <div className="flex flex-row w-full gap-x-4">
              <Select
                disabled
                label="Event Type"
                variant="outlined"
                defaultValue={''}
                value={rule.eventCategoryId}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline.Mui-disabled': {
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
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#FFFFFF',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white !important',
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
                disabled
                type="number"
                variant="outlined"
                label="Score Value"
                value={rule.scoreValue}
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiFormLabel-root': {
                    color: 'white',
                  },
                  '& .MuiSelect-select': {
                    color: 'white',
                  },
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#FFFFFF',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white !important',
                  },
                }}
                fullWidth
              />
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-end gap-x-3">
        <PortalButton
          onClick={async () => {
            await onGoBack();
          }}
        >
          go back
        </PortalButton>
        <PortalButton
          onClick={async () => {
            await onManageParticipant();
          }}
        >
          manage participant
        </PortalButton>
      </div>
    </div>
  );
}
