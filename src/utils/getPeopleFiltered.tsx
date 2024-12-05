import { Person } from '../types';

type FilterParams = {
  sex: string | null;
  query: string | null;
  centuries: string[];
};

export function getPeopleFiltered(
  people: Person[],
  filterParams: FilterParams,
) {
  let filteredPeople = [...people];
  const { sex, query, centuries } = filterParams;

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    const lowerCaseQuery = query.toLowerCase();

    filteredPeople = filteredPeople.filter(
      ({ name, fatherName, motherName }) => {
        return (
          name.toLowerCase().includes(lowerCaseQuery) ||
          fatherName?.toLowerCase().includes(lowerCaseQuery) ||
          motherName?.toLowerCase().includes(lowerCaseQuery)
        );
      },
    );
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(({ born }) => {
      return centuries.includes(Math.ceil(born / 100).toString());
    });
  }

  return filteredPeople;
}
