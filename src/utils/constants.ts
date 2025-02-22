export enum Routes {
  HOME = '/',
  NAVIGATE_HOME = '/home',
  PEOPLE = '/people',
  PERSON = '/people/:slug',
  NOT_FOUND = '*',
}

export enum SearchParams {
  SEX = 'sex',
  QUERY = 'query',
  YEARS = 'years',
  SORT = 'sort',
  ORDER = 'order',
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export enum SortField {
  NAME = 'name',
  SEX = 'sex',
  BORN = 'born',
  DIED = 'died',
}

export enum PersonSex {
  MALE = 'm',
  FEMALE = 'f',
}

export enum ErrorMessage {
  FETCH_ERROR = 'Something went wrong',
}
