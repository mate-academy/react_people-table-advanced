interface SexSortValue {
  id: number,
  sex: 'm' | 'f' | null,
  title: 'All' | 'Male' | 'Female',
}

export const SexSortValues: SexSortValue[] = [
  { id: 0, sex: null, title: 'All' },
  { id: 1, sex: 'm', title: 'Male' },
  { id: 2, sex: 'f', title: 'Female' },
];
