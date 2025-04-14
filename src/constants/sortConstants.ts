export enum SortParams {
  NAME = 'name',
  SEX = 'sex',
  BORN = 'born',
  DIED = 'died',
}

export enum OrderParams {
  ASC = 'asc',
  DESK = 'desc',
}

export const SORT_PEOPLE_PARAMS = {
  SORT: {
    KEY: 'sort',
    VALUE: SortParams,
  },
  ORDER: {
    KEY: 'order',
    VALUE: OrderParams,
  },
};
