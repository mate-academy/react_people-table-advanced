import { Person } from '../types';

type Sort = 'name' | 'sex' | 'born' | 'died';
type Sex = 'm' | 'f';

const sortPeople = (
  people: Person[],
  sort: Sort,
  order: boolean,
) => {
  switch (sort) {
    case 'name':
    case 'sex': {
      return order
        ? [...people].sort(
          (person1, person2) => person2[sort].localeCompare(person1[sort]),
        )
        : [...people].sort(
          (person1, person2) => person1[sort].localeCompare(person2[sort]),
        );
    }

    case 'born':
    case 'died': {
      return order
        ? [...people]
          .sort((person1, person2) => person2[sort] - person1[sort])
        : [...people]
          .sort((person1, person2) => person1[sort] - person2[sort]);
    }

    default: {
      return [...people];
    }
  }
};

const sexFilter = (
  people: Person[],
  sex: Sex,
) => {
  return sex === 'm'
    ? [...people].filter(person => person.sex === 'm')
    : [...people].filter(person => person.sex === 'f');
};

const centuriesFilter = (
  people: Person[],
  centuries: Array<string>,
) => {
  return [...people]
    .filter(person => centuries.includes(
      Math.floor(person.born / 100).toString(),
    ));
};

const queryFilter = (
  people: Person[],
  query: string,
) => {
  const lowerCaseQuery = query.toLowerCase();

  return [...people].filter(
    person => person.name.toLowerCase().includes(lowerCaseQuery)
    || (person.motherName
      && person.motherName.toLowerCase().includes(lowerCaseQuery))
    || (person.fatherName
      && person.fatherName.toLowerCase().includes(lowerCaseQuery)),
  );
};

export const getPreparedPeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');
  let preparedPeople = [...people];

  if (sort) {
    preparedPeople = sortPeople(preparedPeople, sort as Sort, !!order);
  }

  if (sex) {
    preparedPeople = sexFilter(preparedPeople, sex as Sex);
  }

  if (centuries.length) {
    preparedPeople = centuriesFilter(preparedPeople, centuries);
  }

  if (query) {
    preparedPeople = queryFilter(preparedPeople, query);
  }

  return preparedPeople;
};
