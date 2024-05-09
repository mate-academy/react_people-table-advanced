import classNames from 'classnames';
import { Person } from '../types';

export const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const getPeopleWithParents = (people: Person[]) => {
  return people.map((person: Person) => {
    const personWithParents = person;

    personWithParents.mother = people.find(
      (p: Person) => p.name === person.motherName,
    );

    personWithParents.father = people.find(
      (p: Person) => p.name === person.fatherName,
    );

    return personWithParents;
  });
};

export const getPreparedPeople = (
  people: Person[],
  {
    sex,
    centuries,
    query,
    sort: sort,
    order,
  }: {
    sex: string | null;
    centuries: string[];
    query: string | null;
    sort: string | null;
    order?: string | null;
  },
) => {
  let preparedPeople = [...people];

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    const getCentury = (person: Person) => Math.ceil(person.born / 100);

    preparedPeople = preparedPeople.filter(person =>
      centuries.includes(getCentury(person).toString()),
    );
  }

  if (query) {
    const normalizedQuery = query.toLocaleLowerCase();

    preparedPeople = preparedPeople.filter(person => {
      return [person.name, person.motherName || '', person.fatherName || '']
        .join('')
        .toLocaleLowerCase()
        .includes(normalizedQuery);
    });
  }

  if (sort) {
    preparedPeople.sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]);

        case 'born':
        case 'died':
          return a[sort] - b[sort];

        default:
          return 0;
      }
    });

    if (order === 'desc') {
      preparedPeople.reverse();
    }
  }

  return preparedPeople;
};
