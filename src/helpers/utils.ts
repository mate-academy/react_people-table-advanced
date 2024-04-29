import { Person } from '../types';
import { getPeople } from '../api';

export const sortPeople = (
  people: Person[],
  sortColumn: string,
  isReversed: boolean,
): Person[] => {
  const copyPeople = [...people];

  switch (sortColumn) {
    case 'name':
      copyPeople.sort((personA, personB) =>
        personA.name.localeCompare(personB.name),
      );
      break;
    case 'sex':
      copyPeople.sort((personA, personB) =>
        personA.sex.localeCompare(personB.sex),
      );
      break;
    case 'born':
      copyPeople.sort((personA, personB) => personA.born - personB.born);
      break;
    case 'died':
      copyPeople.sort((personA, personB) => personA.died - personB.died);
      break;
    default:
      break;
  }

  if (isReversed) {
    copyPeople.reverse();
  }

  return copyPeople;
};

export const filterPeople = (
  people: Person[],
  filterQuery: string,
  gender: string,
  centuries: string[],
): Person[] => {
  let filteredPeople = [...people];

  if (filterQuery) {
    filteredPeople = filteredPeople.filter(person =>
      person.name.toLowerCase().includes(filterQuery.toLowerCase()),
    );
  }

  if (gender) {
    filteredPeople = filteredPeople.filter(person => person.sex === gender);
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      const century = Math.floor((person.born - 1) / 100) + 1;

      return centuries.includes(century.toString());
    });
  }

  return filteredPeople;
};

export const preparePeopleData = async (): Promise<Person[]> => {
  try {
    const fetchedPeople = await getPeople();

    const preparedPeople = fetchedPeople.map(person => {
      const mother = person.motherName
        ? fetchedPeople.find(p => p.name === person.motherName) ?? null
        : null;

      const father = person.fatherName
        ? fetchedPeople.find(p => p.name === person.fatherName) ?? null
        : null;

      return {
        ...person,
        mother,
        father,
      };
    });

    return preparedPeople as Person[];
  } catch (error) {
    throw new Error('Error preparing people data');
  }
};
