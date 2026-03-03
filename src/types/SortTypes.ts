import { Person } from './Person';

export type SortField = 'name' | 'sex' | 'born' | 'died';

type SortableHeader = {
  label: string;
  field: SortField;
  sortable: true;
};

type NonSortableHeader = {
  label: string;
  field: keyof Person;
  sortable: false;
};

export type TableHeader = SortableHeader | NonSortableHeader;
