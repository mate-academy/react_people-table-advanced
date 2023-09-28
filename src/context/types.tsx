import { Person } from '../types';

export interface PeoplePageContextType {
  people: Person[],
  error: boolean,
  isLoading: boolean,
  sortField: SortField | null,
  isReversed: boolean,
  sortOnClick: (newSortFiled: SortField) => void,
}

export type Props = React.PropsWithChildren<{}>;
export type SortField = 'name' | 'sex' | 'born' | 'died';
