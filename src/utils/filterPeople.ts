import { GenderFilters, Person, SearchQueries } from '../types';

export function filterPeople(
  people: Person[],
  params: URLSearchParams,
): Person[] {
  let filtered = [...people];

  if (params.has(SearchQueries.sex)) {
    if (params.get(SearchQueries.sex) !== GenderFilters.All) {
      filtered = filtered.filter(
        person => person.sex === params.get(SearchQueries.sex),
      );
    }
  }

  if (params.has(SearchQueries.centuries)) {
    filtered = filtered.filter(person => {
      return params.getAll(SearchQueries.centuries).some(centr => {
        const personCentr = Math.floor(+person.born / 100 + 1);

        return personCentr === +centr;
      });
    });
  }

  if (params.has(SearchQueries.query)) {
    filtered = filtered.filter(person => {
      const { name, fatherName, motherName } = person;
      const query = params.get(SearchQueries.query) || '';

      return [name, fatherName, motherName].some(searchNames =>
        searchNames?.toLocaleLowerCase().includes(query?.toLocaleLowerCase()),
      );
    });
  }

  return filtered;
}
