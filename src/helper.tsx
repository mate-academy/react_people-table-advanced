import { Person, SortBy } from './types';

export const getFilteredPeople = (
  people: Person[],
  sortField: keyof Person,
  sortOrder: string,
  filterSex: string,
  searchQuery: string,
  filterByCentries: string[],
) => {
  let preparedPeople = [...people];

  if (filterByCentries.length) {
    preparedPeople = preparedPeople.filter(person => {
      const mathCentry = Math.ceil(person.born / 100).toString();

      return filterByCentries.includes(mathCentry);
    });
  }

  if (searchQuery) {
    preparedPeople = preparedPeople.filter(person => (
      person.name.toLowerCase().includes(searchQuery.toLocaleLowerCase().trim())
      || person.fatherName?.toLowerCase().includes(
        searchQuery.toLocaleLowerCase().trim(),
      )
      || person.motherName?.toLowerCase().includes(
        searchQuery.toLocaleLowerCase().trim(),
      )
    ));
  }

  if (filterSex) {
    preparedPeople = preparedPeople.filter(person => person.sex === filterSex);
  }

  if (sortField && sortOrder) {
    preparedPeople = preparedPeople.sort((a, b) => {
      const personA = sortOrder === SortBy.Asc ? a[sortField] : b[sortField];
      const personB = sortOrder === SortBy.Asc ? b[sortField] : a[sortField];

      if (typeof personA === 'number' && typeof personB === 'number') {
        return personA - personB;
      }

      if (typeof personA === 'string' && typeof personB === 'string') {
        return personA.localeCompare(personB);
      }

      return 0;
    });
  }

  return preparedPeople;
};
