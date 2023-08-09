export enum SortParameters {
  all = '',
  name = 'name',
  sex = 'sex',
  born = 'born',
  died = 'died',
}

export type FilterParameters = {
  query?: string,
  sex?: string,
  centuries?: string[],
};
