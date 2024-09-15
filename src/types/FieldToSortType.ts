export enum FieldsToSort {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}
export type FieldToSortKey = keyof typeof FieldsToSort;
export type FieldToSortSearchQuery = `${FieldsToSort}`;
