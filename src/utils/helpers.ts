export enum ErrorType {
  LOADING = 'Something went wrong',
  NOPEOPLE = 'There are no people on the server',
  SEARCH = 'There are no people matching the current search criteria',
}

export enum FilterValues {
  ALL = 'All',
  MALE = 'Male',
  FEMALE = 'Female',
}

export type SearchParams = {
  [key: string]: string | string[] | null,
};

type SortValues = string | number;

export const getCentury = (value: number) => (
  (+value.toString().slice(0, 2) + 1).toString()
);

export const compareValues = (
  a: SortValues,
  b: SortValues,
  flag: boolean,
) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return (flag ? -1 : 1) * a.localeCompare(b);
  }

  if (typeof a === 'number' && typeof b === 'number') {
    return (flag ? -1 : 1) * (a - b);
  }

  return 0;
};

export const columns = [
  { name: 'Name', sortable: true },
  { name: 'Sex', sortable: true },
  { name: 'Born', sortable: true },
  { name: 'Died', sortable: true },
  { name: 'Mother', sortable: false },
  { name: 'Father', sortable: false },
];
