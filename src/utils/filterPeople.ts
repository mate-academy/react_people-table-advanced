import { Person } from '../types';
import { calculateCenturyByYear } from './calculateCentury';

export const filterPeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
  sort: string | null,
  order: string | null,
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
        return filteredList.sort((person1, person2) =>
          !order
            ? person1.name.localeCompare(person2.name)
            : person2.name.localeCompare(person1.name),
        );
      case 'sex':
        return filteredList.sort((person1, person2) =>
          !order
            ? person1.sex.localeCompare(person2.sex)
            : person2.sex.localeCompare(person1.sex),
        );
      case 'born':
        return filteredList.sort((person1, person2) =>
          !order ? person1.born - person2.born : person2.born - person1.born,
        );
      case 'died':
        return filteredList.sort((person1, person2) =>
          !order ? person1.died - person2.died : person2.died - person1.died,
        );
      default:
        return people;
    }
  }

  return filteredList;
};
