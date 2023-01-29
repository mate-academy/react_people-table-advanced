interface SortType {
  id: number,
  value: string,
  title: string,
}

export const sortTypes: SortType[] = [
  { id: 1, value: 'name', title: 'Name' },
  { id: 2, value: 'sex', title: 'Sex' },
  { id: 3, value: 'born', title: 'Born' },
  { id: 4, value: 'died', title: 'Died' },
];
