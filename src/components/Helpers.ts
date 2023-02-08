import classNames from 'classnames';
import { Person } from '../types';

interface NavLinkObj {
  isActive: boolean,
}

export function makeActive(objectWithProperties: NavLinkObj) {
  const { isActive } = objectWithProperties;

  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
}

export function findParent(
  name: string | null,
  people: Person[],
): Person | null {
  if (!name) {
    return null;
  }

  for (let i = 0; i < people.length; i += 1) {
    const personName = people[i].name;

    if (personName === name) {
      return people[i];
    }
  }

  return null;
}

export function makeFirstLetterBig(word: keyof Person): string {
  const firstLetter = word.slice(0, 1).toUpperCase();

  return firstLetter + word.slice(1);
}
