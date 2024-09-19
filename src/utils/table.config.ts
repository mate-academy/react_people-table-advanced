import { TableCell } from '../types/Table';

export const TABLE_HEAD = [
  {
    key: 'name',
    title: 'Name',
    sort: true,
  },
  {
    key: 'sex',
    title: 'Sex',
    sort: true,
  },
  {
    key: 'born',
    title: 'Born',
    sort: true,
  },
  {
    key: 'died',
    title: 'Died',
    sort: true,
  },
  {
    key: 'mother',
    title: 'Mother',
    sort: false,
  },
  {
    key: 'father',
    title: 'Father',
    sort: false,
  },
] as TableCell[];
