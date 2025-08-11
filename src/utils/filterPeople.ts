import { Person } from '../types';
import { calculateCenturyByYear } from './calculateCentury';

export const filterPeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
  sort: string | null,
) => {
  const filteredList = people
    .filter(person => (!sex ? true : person.sex === sex))
    .filter(person =>
      !centuries.length
        ? true
        : centuries.includes(String(calculateCenturyByYear(person.born))),
    )
    .filter(person =>
      !query
        ? true
        : person.name.toLowerCase().includes(query.trim().toLowerCase()) ||
          person.motherName
            ?.toLowerCase()
            .includes(query.trim().toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.trim().toLowerCase()),
    );

  if (!!sort) {
    switch (sort) {
      case 'name':
      case 'sex':
        return filteredList.sort((person1, person2) =>
          person1[sort].localeCompare(person2[sort]),
        );
      case 'born':
      case 'died':
        return filteredList.sort(
          (person1, person2) => person1[sort] - person2[sort],
        );
      default:
        return filteredList;
    }
  }

  return filteredList;
};
