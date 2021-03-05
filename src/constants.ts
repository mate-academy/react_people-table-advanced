import { Person } from './typesDefinitions';

export const NAME = 'name';
export const SEX = 'sex';
export const BORN = 'born';
export const DIED = 'died';
export const ASC = 'asc';
export const DESC = 'desc';
export const TABLE_HEADERS = [NAME, SEX, BORN, DIED]
export const NAME_REGEXP = /^[a-zA-Z\s]*$/;
export const CURRENT_YEAR = new Date().getFullYear()

export const FILTER_PARENTS = (
  people: Person[], gender: 'm' | 'f',  bornYear: number
  ) => {
  return people.filter(
    person => person.sex === gender
    && person.born < bornYear
    && person.died > bornYear
  );
}
