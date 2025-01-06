import { Person } from '../types';

type Sort = 'name' | 'sex' | 'born' | 'died';

export function getSortedPeople(
  people: Person[],
  searchParams: URLSearchParams,
) {
  const sortBy = searchParams.get('sort') as Sort;
  const order = searchParams.get('order');
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  let sortedPeople = [...people];

  if (sortBy) {
    sortedPeople = sortedPeople.sort((person1, person2) => {
      const personA = person1[sortBy];
      const personB = person2[sortBy];

      if (typeof personA === 'string' && typeof personB === 'string') {
        return personA.localeCompare(personB);
      } else if (typeof personA === 'number' && typeof personB === 'number') {
        return personA - personB;
      }

      return 0;
    });
  }

  if (centuries.length > 0) {
    sortedPeople = sortedPeople.filter(person => {
      const birthCentury = Math.ceil(person.born / 100);

      return centuries.includes(`${birthCentury}`);
    });
  }

  if (sex) {
    sortedPeople = sortedPeople.filter(person => person.sex === sex);
  }

  if (query) {
    sortedPeople = sortedPeople.filter(person =>
      (person.name + person.motherName + person.fatherName)
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  }

  return order === 'desc' ? sortedPeople.reverse() : sortedPeople;
}
