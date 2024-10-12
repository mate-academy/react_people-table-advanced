import { GenderFilters, Person, SearchQueries } from '../types';

export function filterPeople(
  people: Person[],
  params: URLSearchParams,
): Person[] {
  let filtered = [...people];

  if (params.has(SearchQueries.sex)) {
    const curParamSex = params.get(SearchQueries.sex);

    if (curParamSex !== GenderFilters.All) {
      filtered = filtered.filter(person => person.sex === curParamSex);
    }
  }

  if (params.has(SearchQueries.centuries)) {
    const paramCenturies = params.getAll(SearchQueries.centuries);

    filtered = filtered.filter(person => {
      return paramCenturies.some(centr => {
        const personCentr = Math.floor(+person.born / 100 + 1);

        return personCentr === +centr;
      });
    });
  }

  if (params.has(SearchQueries.query)) {
    const query = params.get(SearchQueries.query);

    filtered = filtered.filter(person => {
      const { name, fatherName, motherName } = person;

      return [name, fatherName, motherName].some(searchNames => {
        if (searchNames && query) {
          return searchNames
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase());
        }

        return;
      });
    });
  }

  return filtered;
}
