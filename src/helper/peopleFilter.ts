import { Person } from '../types';

export function peopleFilter(
  people: Person[],
  sex: string | null,
  query: string,
  centuries: string[],
  sorting: {
    field: string | null;
    order: string | null;
  },
) {
  let newPeople = people;

  if (sex === 'm') {
    newPeople = newPeople.filter((person: Person) => person.sex === 'm');
  }

  if (sex === 'f') {
    newPeople = newPeople.filter((person: Person) => person.sex === 'f');
  }

  if (query) {
    newPeople = newPeople.filter(
      person =>
        person.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        person.motherName
          ?.toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()) ||
        person.fatherName
          ?.toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()),
    );
  }

  if (Boolean(centuries.length)) {
    newPeople = newPeople.filter((person: Person) =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  if (sorting.field && sorting.order) {
    const { field, order } = sorting;

    if (field === 'name' || field === 'sex') {
      newPeople = newPeople.sort((a, b) => {
        const aValue = a[field]?.toLocaleLowerCase() || '';
        const bValue = b[field]?.toLocaleLowerCase() || '';

        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    if (field === 'born' || field === 'died') {
      newPeople = newPeople.sort((a, b) => {
        const aValue = (a[field] as number) || 0;
        const bValue = (b[field] as number) || 0;

        return order === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }
  }

  return newPeople;
}
