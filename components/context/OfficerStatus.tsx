import { createContext } from 'react';

interface OfficerStatusDataType {
  isDirector: boolean;
  isOfficer: boolean;
  // list of divisions in which a person is a director
  directorOfDivisions: string[];
}

export const OfficerStatusContext = createContext<OfficerStatusDataType>({
  isDirector: false,
  isOfficer: false,
  directorOfDivisions: [],
});
