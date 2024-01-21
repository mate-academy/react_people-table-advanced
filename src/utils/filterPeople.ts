import { Person } from '../types';
import { Sex } from '../types/Filters';
import { SortBy } from '../types/SortBy';

export const filterPeople = (
  peopleToFilter: Person[],
  sex: Sex,
  query: string,
  centuries: number[],
) => {
  let peopleToRender = [...peopleToFilter];

  if (sex) {
    peopleToRender = peopleToRender.filter(person => person.sex === sex);
  }

  if (query) {
    peopleToRender = peopleToRender.filter(person => {
      const normalizedQuery = query.toLowerCase();
      const normalizedPersonName = person.name.toLowerCase();

      if (person.fatherName) {
        const normalizedFatherName = person.fatherName.toLowerCase();

        return normalizedFatherName.includes(normalizedQuery);
      }

      if (person.motherName) {
        const normalizedMotherName = person.motherName?.toLowerCase();

        return normalizedMotherName.includes(normalizedQuery);
      }

      return normalizedPersonName.includes(normalizedQuery)
        || normalizedPersonName.includes(normalizedQuery);
    });

    if (centuries.length) {
      peopleToRender = peopleToRender.filter(person => {
        const personBornCentury = Math.ceil(person.born / 100);

        return centuries.includes(personBornCentury);
      });
    }
  }

  return peopleToRender;
};

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
