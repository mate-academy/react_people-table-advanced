import { Person, SortBy } from './types';

export const getFilteredPeople = (
  people: Person[],
  sortField: keyof Person,
  sortOrder: string,
  filterSex: string,
  searchQuery: string,
  filterByCentries: string[],
) => {
  const preparedPople = [...people];

  if (filterByCentries.length) {
    return preparedPople.filter(person => {
      const mathCentry = Math.ceil(person.born / 100).toString();

      return filterByCentries.includes(mathCentry);
    });
  }

  if (searchQuery) {
    return preparedPople.filter(person => (
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
    return preparedPople.filter(person => person.sex === filterSex);
  }

  if (sortField) {
    return preparedPople.sort((a, b) => {
      const personA = sortOrder === SortBy.Asc ? b[sortField] : a[sortField];
      const personB = sortOrder === SortBy.Desc ? a[sortField] : b[sortField];

      if (typeof personA === 'number' && typeof personB === 'number') {
        return personA - personB;
      }

      if (typeof personA === 'string' && typeof personB === 'string') {
        return personA.localeCompare(personB);
      }

      return 0;
    });
  }

  return preparedPople;
};
