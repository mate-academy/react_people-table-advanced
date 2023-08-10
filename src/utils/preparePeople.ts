import { Person } from '../types';

const filterByValue = (peopleForFilter: Person[], value: string) => {
  const normalizedValue = value.toLowerCase().trim();

  return peopleForFilter.filter(person => (
    person.name.toLowerCase().includes(normalizedValue)
    || person.motherName?.toLowerCase().includes(normalizedValue)
    || person.fatherName?.toLowerCase().includes(normalizedValue)
  ));
};

const filterBySex = (peopleForFilter: Person[], sex: string) => (
  peopleForFilter.filter(person => person.sex === sex)
);

const filterByCenturies = (peopleForFilter: Person[], centuries: string[]) => (
  peopleForFilter.filter(person => (
    centuries.includes(Math.ceil(person.died / 100).toString())
  ))
);

const sortPeople = (a: Person, b: Person, sort: string): number => {
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
};

const sortBy = (sortedPeople: Person[], sort: string, order: string) => {
  switch (order) {
    case '':
      return sortedPeople.sort((a, b) => sortPeople(a, b, sort));

    case 'desc':
      return sortedPeople.sort((a, b) => sortPeople(a, b, sort)).reverse();

    default:
      return sortedPeople;
  }
};

export const preparePeople = (
  people: Person[],
  value: string,
  sex: string,
  centuries: string[],
  sort: string,
  order: string,
) => {
  let mapedPeople: Person[] = people.map(person => {
    const mother = people.find(findPerson => (
      findPerson.name === person.motherName
    ));

    const father = people.find(findPerson => (
      findPerson.name === person.fatherName
    ));

    return { ...person, mother, father };
  });

  if (value.length !== 0) {
    mapedPeople = filterByValue(mapedPeople, value);
  }

  if (sex !== '') {
    mapedPeople = filterBySex(mapedPeople, sex);
  }

  if (centuries.length !== 0) {
    mapedPeople = filterByCenturies(mapedPeople, centuries);
  }

  if (sort !== '') {
    mapedPeople = sortBy(mapedPeople, sort, order);
  }

  return mapedPeople;
};
