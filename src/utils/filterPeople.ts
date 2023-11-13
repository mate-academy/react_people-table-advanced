import { Person } from '../types';
import { Filter } from '../types/Filter';

export const filterPeople = (
  people: Person[],
  {
    query = '', sex = '', centuries = [], sort = '', order = '',
  }: Filter,
): Person[] => {
  let preparedPeople = [...people];
  const preparedQuery = query.trim().toLowerCase();

  if (preparedQuery) {
    preparedPeople = preparedPeople.filter((person) => {
      const { name, fatherName, motherName } = person;

      return (
        name.toLowerCase().includes(preparedQuery)
        || (motherName && motherName.toLowerCase().includes(preparedQuery))
        || (fatherName && fatherName.toLowerCase().includes(preparedQuery))
      );
    });
  }

  if (sex) {
    preparedPeople = preparedPeople.filter((person) => person.sex === sex);
  }

  if (centuries.length > 0) {
    preparedPeople = preparedPeople.filter((person) => {
      const personCentury = Math.ceil(person.born / 100);

      return centuries.includes(personCentury.toString());
    });
  }

  if (sort) {
    preparedPeople.sort((person1, person2) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return person1[sort].localeCompare(person2[sort]);

        case 'born':
        case 'died':
          return person1[sort] - person2[sort];

        default:
          return 0;
      }
    });
  }

  if (order === 'desc') {
    preparedPeople.reverse();
  }

  return preparedPeople;
};
