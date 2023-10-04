import { Person } from '../types';

export function getCentury(person: Person, centuries: string[]) {
  return centuries.includes(Math.ceil(person.born / 100).toString());
}

export function getSortedPeople(
  persons: Person[],
  sort: string,
  order: string,
  query: string,
  sex: string,
  centuries: string[],
): Person[] {
  let personsClone = [...persons];

  if (sort) {
    personsClone = personsClone.sort((personA, personB) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return personA[sort].localeCompare(personB[sort]);

        case 'born':
        case 'died':
          return (+personA[sort]) - (+personB[sort]);

        default:
          return 0;
      }
    });
  }

  if (order) {
    personsClone.reverse();
  }

  if (query) {
    personsClone = personsClone.filter(({ name, motherName, fatherName }) => {
      const preparedNames = (name + motherName + fatherName).toLowerCase();

      return preparedNames.includes(query);
    });
  }

  if (sex) {
    personsClone = personsClone.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    personsClone = personsClone.filter(person => getCentury(person, centuries));
  }

  return personsClone;
}
