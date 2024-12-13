export interface Params {
  sortBy: string | null;
  sortOrder: string | null;
  query: string;
  sex: string;
  centuries: number[];
}

export enum SortColumns {
  Name = 'Name',
  Sex = 'Sex',
  Born = 'Born',
  Died = 'Died',
}
