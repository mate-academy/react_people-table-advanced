import { Person } from '../types';

type Params = {
  sex: string,
  query: string,
  centuries: string[],
  sort: string,
  order: string,
};

export function getVisiblePeople(people: Person[], params: Params) {
  const {
    sex,
    query,
    centuries,
    sort,
    order,
  } = params;
  let copyPeople = [...people];

  if (sex) {
    copyPeople = copyPeople.filter(person => person.sex === sex);
  }

  if (query) {
    copyPeople = copyPeople.filter(
      person => (
        person.name.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())
      ),
    );
  }

  if (centuries.length > 0) {
    copyPeople = copyPeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return centuries.includes(century);
    });
  }

  if (sort) {
    copyPeople = copyPeople.sort((person1, person2) => {
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

  if (order) {
    copyPeople.reverse();
  }

  return copyPeople;
}
