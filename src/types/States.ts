import { Person } from './Person';

export type States = {
  people: Person[];
  isReady: boolean;
  hasLoadingErrorMsg: boolean;
  hasNoPeopleMsg: boolean;
  hasNoMatchMsg: boolean;
};
