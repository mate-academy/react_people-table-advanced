import { TableHeaders } from './types/TableHeaders';

// #region api.ts

// The base URL for the API.
export const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';
// #endregion

// #region PeopleTable.tsx

// Headers of the People table indicating the possibility of sorting
export const TABLE_HEADERS: TableHeaders[] = [
  {
    id: 1,
    title: 'Name',
    isSorted: true,
  },
  {
    id: 2,
    title: 'Sex',
    isSorted: true,
  },
  {
    id: 3,
    title: 'Born',
    isSorted: true,
  },
  {
    id: 4,
    title: 'Died',
    isSorted: true,
  },
  {
    id: 5,
    title: 'Mother',
    isSorted: false,
  },
  {
    id: 6,
    title: 'Father',
    isSorted: false,
  },
];
// #endregion

// #region PeopleFilter.tsx

// Possible centuries for sorting
export const CENTURIES: string[] = ['16', '17', '18', '19', '20'];
// #endregion
