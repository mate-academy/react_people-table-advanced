interface SexFilterValue {
  value: null | 'm' | 'f';
  title: string;
}

export const SEX_FILTER_VALUES: SexFilterValue[] = [
  { value: null, title: 'All' },
  { value: 'm', title: 'Male' },
  { value: 'f', title: 'Female' },
];

export const CENTURIES = ['16', '17', '18', '19', '20'];

interface SortType {
  value: string;
  title: string;
}

export const sortTypes: SortType[] = [
  { value: 'name', title: 'Name' },
  { value: 'sex', title: 'Sex' },
  { value: 'born', title: 'Born' },
  { value: 'died', title: 'Died' },
];
