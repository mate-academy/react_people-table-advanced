export enum SexFilterValue {
  Male = 'm',
  Female = 'f',
}

export interface PeopleFilterParams {
  sex?: SexFilterValue | null;
  query?: string | null;
  centuries?: string | null;
}
