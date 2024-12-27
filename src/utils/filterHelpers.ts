type FilterObject = {
  [key: string]: string | null;
};

export const SEX_FILTERS: FilterObject = {
  All: null,
  Male: 'm',
  Female: 'f',
};

export const FILTER_CENTURIES = ['16', '17', '18', '19', '20'];

export const SORT_FILTERS: FilterObject = {
  Name: 'name',
  Sex: 'sex',
  Born: 'born',
  Died: 'died',
};
