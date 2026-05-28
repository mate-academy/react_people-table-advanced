import classNames from 'classnames';
import { Centuries } from './searchHelper';
import { Person } from '../types';

export const getPeople = () => {
  return fetch(
    'https://mate-academy.github.io/react_people-table/api/people.json',
  )
    .then(response => {
      return response.json();
    })
    .catch(() => {
      throw new Error('Error ');
    });
};

export function activeCenturies(num: number, centuries: Centuries) {
  if (centuries) {
    return centuries.includes(num.toString())
      ? centuries.filter(c => c !== num.toString())
      : [...centuries, num.toString()];
  } else {
    return [num.toString()];
  }
}

export function toggleSortArrows(
  sort: string | null,
  order: string | null,
  targetSort: string,
) {
  return classNames('fas', {
    'fa-sort': sort !== targetSort,
    'fa-sort-up': sort === targetSort && !order,
    'fa-sort-down': sort === targetSort && order,
  });
}

export function getSortParams(
  sort: string | null,
  order: string | null,
  targetSort: string,
) {
  const isActive = sort === targetSort;

  return {
    sort: isActive && order === 'desc' ? null : targetSort,
    order: !isActive ? null : order === 'desc' ? null : 'desc',
  };
}

export function getCentury(person: Person) {
  const century = Math.ceil(person.born / 100);

  return century.toString();
}

export function prepearPeople(people: Person[]) {
  return people.map(person => {
    let prepearedPerson = { ...person };
    const mother = people.find(
      personMother => person.motherName === personMother.name,
    );
    const father = people.find(
      personFather => person.fatherName === personFather.name,
    );

    if (mother) {
      prepearedPerson = { ...prepearedPerson, mother: mother || '-' };
    }

    if (father) {
      prepearedPerson = { ...prepearedPerson, father: father || '-' };
    }

    return prepearedPerson;
  });
}
