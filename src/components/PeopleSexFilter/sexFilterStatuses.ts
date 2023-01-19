interface SexFilterStatus {
  id: number;
  value: null | 'm' | 'f';
  title: string;
}

export const sexFilterStatuses: SexFilterStatus[] = [
  { id: 1, value: null, title: 'All' },
  { id: 2, value: 'm', title: 'Male' },
  { id: 3, value: 'f', title: 'Female' },
];
