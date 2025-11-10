import { Filters, Person } from '../types';

export function getFilteredPeople(
  people: Person[],
  filters: Filters,
): Person[] {
  const { sex, query, centuries } = filters;

  let newPeople: Person[] = [...people];

  if (sex) {
    newPeople = newPeople.filter(person => person.sex === sex);
  }

  if (query) {
    const search = query.toLocaleLowerCase();

    newPeople = newPeople.filter(person => {
      const matchName = person.name.toLowerCase().includes(search);
      const matchMotherName =
        person.motherName?.toLowerCase().includes(search) ?? false;
      const matchFatherName =
        person.fatherName?.toLowerCase().includes(search) ?? false;

      return matchName || matchMotherName || matchFatherName;
    });
  }

  if (centuries.length) {
    newPeople = newPeople.filter(person => {
      const bornCentury = Math.ceil(person.born / 100);

      return centuries.includes(bornCentury);
    });
  }

  return newPeople;
}
