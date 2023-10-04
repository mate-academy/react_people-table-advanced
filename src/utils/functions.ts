import classnames from 'classnames';
import { Person } from '../types';
import { FEMALE_SEX, MALE_SEX } from './constants';

export function getFatherPerson(persons: Person[], person: Person) {
  return persons.find(({ sex, name }: Person) => sex === MALE_SEX
    && name === person.fatherName);
}

export function getMotherPerson(persons: Person[], person: Person) {
  return persons.find(({ sex, name }: Person) => sex === FEMALE_SEX
    && name === person.motherName);
}

export const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classnames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

export const hasIncludeQuery = (name: string, query: string) => {
  const normalizedQuery = query.toLowerCase();

  return name.toLowerCase().includes(normalizedQuery);
};
