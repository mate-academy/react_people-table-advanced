import classNames from 'classnames';
import { Person, SortField, SortOrder } from '../types';

const CENTURY_VALUE = 100;

export function getNavLinkClass({ isActive }: { isActive: boolean }) {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
}

export function getPreparedPeople(people: Person[]): Person[] {
  return people.map(person => {
    const mother = people.find(({ name }) => name === person.motherName);
    const father = people.find(({ name }) => name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
}

export function getSortedPeople(
  people: Person[],
  sort: string,
  order: string,
) {
  const direction = order === SortOrder.Desc ? -1 : 1;
  const sortedPeople = [...people];

  if (!sort) {
    return sortedPeople;
  }

  return sortedPeople.sort((a, b) => {
    switch (sort) {
      case SortField.Name:
        return a.name.localeCompare(b.name) * direction;
      case SortField.Sex:
        return a.sex.localeCompare(b.sex) * direction;
      case SortField.Born:
        return (a.born - b.born) * direction;
      case SortField.Died:
        return (a.died - b.died) * direction;
      default:
        return 0;
    }
  });
}

export function getCentury(year: number) {
  return Math.ceil(year / CENTURY_VALUE);
}

export function getFilteredPeople(
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
) {
  const normalizedQuery = query.toLowerCase();
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (normalizedQuery) {
    filteredPeople = filteredPeople.filter(
      ({ name, fatherName, motherName }) => (
        name.toLowerCase().includes(normalizedQuery)
        || fatherName?.toLowerCase().includes(normalizedQuery)
        || motherName?.toLowerCase().includes(normalizedQuery)
      ),
    );
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(
      ({ born }) => centuries.includes(getCentury(born).toString()),
    );
  }

  return filteredPeople;
}

export function toggleCentury(
  currentCenturies: string[],
  centuryToToggle: string,
) {
  return currentCenturies.includes(centuryToToggle)
    ? currentCenturies.filter(century => century !== centuryToToggle)
    : [...currentCenturies, centuryToToggle];
}
