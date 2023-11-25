import classNames from 'classnames';
import { Person } from '../types';

export function getTabClassName({ isActive }: { isActive: boolean }) {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
}

export function addParents(people: Person[]) {
  return people.map(person => ({
    ...person,
    mother: people.find(human => human.name === person.motherName),
    father: people.find(human => human.name === person.fatherName),
  }));
}

export function getCentury(year: number) {
  return Math.ceil(year / 100);
}
