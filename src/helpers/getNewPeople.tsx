import { Person } from '../types/Person';

interface Params {
  centuries: string[];
  query: string;
  sex: string;
  sortField: keyof Person;
  order: string;
}

export function getNewPeople(
  people: Person[],
  params: Params,
): Person[] {
  let newPeople = [...people];

  const {
    centuries,
    query,
    sex,
    sortField,
    order,
  } = params;

  if (centuries.length) {
    newPeople = newPeople.filter(
      person => centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (query.trim()) {
    newPeople = newPeople.filter(person => {
      const newQuery = query.toLowerCase().trim();
      const newName = person.name.toLowerCase();
      const newMotherName = person.motherName?.toLowerCase();
      const newFatherName = person.fatherName?.toLowerCase();

      return newName.includes(newQuery)
        || newMotherName?.includes(newQuery)
        || newFatherName?.includes(newQuery);
    });
  }

  if (sex) {
    newPeople = newPeople.filter(person => person.sex === sex);
  }

  if (sortField) {
    newPeople.sort((person1, person2) => {
      const a = order === 'desc' ? person2[sortField] : person1[sortField];
      const b = order === 'desc' ? person1[sortField] : person2[sortField];

      if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      }

      if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
      }

      return 0;
    });
  }

  return newPeople;
}
