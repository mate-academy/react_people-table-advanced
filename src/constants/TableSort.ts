interface TableSort {
  id: number;
  title: string;
  isSorted: boolean;
}

export const TABLE_SORT: TableSort[] = [
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

export const CENTURIES: string[] = ['16', '17', '18', '19', '20'];
