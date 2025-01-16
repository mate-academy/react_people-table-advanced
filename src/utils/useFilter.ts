import { Person } from '../types';
import { useState } from 'react';

export function useFilter(
  people: Person[],
): [Person[], (params: URLSearchParams) => void] {
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);
  const filter = (params: URLSearchParams) => {
    const paramsExist = params.toString() !== '';

    if (!paramsExist) {
      setFilteredPeople(people);
    } else {
      const filtered = people.filter((person: Person) => {
        const personCentury = Math.ceil(person.born / 100).toString();
        const paramsQuery = params.get('query') || '';
        const hasMatchingCentury = params
          .getAll('century')
          .includes(personCentury);
        const hasMatchingSex =
          params.get('sex') === null || person.sex === params.get('sex');
        const hasMatchingName =
          paramsQuery === '' ||
          person.name.toLowerCase().includes(paramsQuery.toLowerCase());

        return hasMatchingCentury || hasMatchingSex || hasMatchingName;
      });

      setFilteredPeople(filtered);
    }
  };

  return [filteredPeople, filter];
}
