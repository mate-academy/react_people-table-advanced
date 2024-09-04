import { Person } from '../types';
import { FilterParams } from './FilterParams';
import { SortParams } from './SortParams';

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

  if (sex === FilterParams.SEX_MALE) {
    newPeople = newPeople.filter(
      (person: Person) => person.sex === FilterParams.SEX_MALE,
    );
  }

  if (sex === FilterParams.SEX_FEMALE) {
    newPeople = newPeople.filter(
      (person: Person) => person.sex === FilterParams.SEX_FEMALE,
    );
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

    if (field === SortParams.SORT_NAME || field === SortParams.SORT_SEX) {
      newPeople = newPeople.sort((a, b) => {
        const aValue = a[field]?.toLocaleLowerCase() || '';
        const bValue = b[field]?.toLocaleLowerCase() || '';

        return order === SortParams.ORDER_ASC
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    if (field === SortParams.SORT_BORN || field === SortParams.SORT_DIED) {
      newPeople = newPeople.sort((a, b) => {
        const aValue = (a[field] as number) || 0;
        const bValue = (b[field] as number) || 0;

        return order === SortParams.ORDER_ASC
          ? aValue - bValue
          : bValue - aValue;
      });
    }
  }

  return newPeople;
}
