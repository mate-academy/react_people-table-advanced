export const FilterSexValues = {
  ALL: 'All',
  MALE: 'm',
  FEMALE: 'f',
};

export type SexFilter =
  | typeof FilterSexValues.ALL
  | typeof FilterSexValues.MALE
  | typeof FilterSexValues.FEMALE;
