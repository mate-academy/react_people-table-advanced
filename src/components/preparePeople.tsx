import { Person } from '../types';

interface FilterFields {
  sex: string;
  query: string;
  centuries: string[];
  sort: string;
  order: string;
}

export const preparePeople = (
  peopleFromServer: Person[],
  { sex, query, centuries, sort, order }: FilterFields,
) => {
  let preparedPeople = [...peopleFromServer];

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (query) {
    preparedPeople = preparedPeople.filter(
      person =>
        person.name.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query),
    );
  }

  if (centuries.length > 0) {
    preparedPeople = preparedPeople.filter(person =>
      centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (sort) {
    preparedPeople.sort((person1, person2) => {
      switch (sort) {
        case 'born':
        case 'died':
          return person1[sort] - person2[sort];
        case 'name':
        case 'sex':
          return person1[sort].localeCompare(person2[sort]);
        default:
          return 0;
      }
    });
  }

  if (order) {
    preparedPeople.reverse();
  }

  return preparedPeople;
};
