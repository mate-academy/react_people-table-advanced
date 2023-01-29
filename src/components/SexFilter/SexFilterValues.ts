interface SexFilterValue {
  id: number,
  value: null | 'm' | 'f',
  title: string,
}

export const SexFilterValues: SexFilterValue[] = [
  { id: 0, value: null, title: 'All' },
  { id: 1, value: 'm', title: 'Male' },
  { id: 2, value: 'f', title: 'Female' },
];
