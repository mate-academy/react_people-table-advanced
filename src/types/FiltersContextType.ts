import { SetURLSearchParams } from 'react-router-dom';
import { Person } from './Person';
import { SearchParams } from '../utils/searchHelper';

export enum SortField {
  Name = 'Name',
  Sex = 'Sex',
  Born = 'Born',
  Died = 'Died',
}

export type FiltersContextType = {
  query: string;
  century: string[];
  toggleCentury: (num: string) => string[];
  setSearchWith: (params: SearchParams) => void;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  sortedPeople: Person[];
  sex: string[];
  sort: SortField | null;
  order: SortField | 'desc' | null;
  toggleDirection: (newSort: SortField) => void;
};
