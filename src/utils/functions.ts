import classnames from 'classnames';
import { Person } from '../types';
import { YEARS_PER_CENTURY } from './constants';
import { TypeSort } from '../types/TypeSort';

export function getFatherPerson(persons: Person[], person: Person) {
  return persons.find(({ name }: Person) => name === person.fatherName);
}

export function getMotherPerson(persons: Person[], person: Person) {
  return persons.find(({ name }: Person) => name === person.motherName);
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

const sortPeople = (people: Person[], sort: string) => {
  people.sort((a, b) => {
    switch (sort) {
      case TypeSort.Name:
        return a.name.localeCompare(b.name);
      case TypeSort.Sex:
        return a.sex.localeCompare(b.sex);
      case TypeSort.Born:
        return a.born - b.born;
      case TypeSort.Died:
        return a.died - b.died;
      default:
        return 0;
    }
  });
};

export const getFilteredPeople = (
  people: Person[],
  sex: string,
  centuries: string[],
  query: string,
  sort: string,
  order: string,
) => {
  let preparedPeople = [...people];

  if (sex.length > 0) {
    preparedPeople = preparedPeople.filter((person) => {
      return person.sex === sex;
    });
  }

  if (centuries.length > 0) {
    preparedPeople = preparedPeople.filter(person => {
      const numberOfCentury = Math.ceil(person.born / YEARS_PER_CENTURY);

      return centuries.includes(numberOfCentury.toString());
    });
  }

  if (query) {
    preparedPeople = preparedPeople.filter(person => {
      return hasIncludeQuery(person.name, query)
        || hasIncludeQuery((person.motherName || ''), query)
        || hasIncludeQuery((person.fatherName || ''), query);
    });
  }

  if (sort) {
    sortPeople(preparedPeople, sort);
  }

  if (order) {
    preparedPeople.reverse();
  }

  return preparedPeople;
};

export const preparePeople = (persons: Person[]) => {
  return persons.map((personData) => {
    const mother = getMotherPerson(
      persons, personData,
    );
    const father = getFatherPerson(
      persons, personData,
    );

    return {
      ...personData,
      mother,
      father,
    };
  });
};
