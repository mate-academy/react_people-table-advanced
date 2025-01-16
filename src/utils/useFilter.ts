import { Person } from '../types';
import { useState } from 'react';

export function useFilter(
  people: Person[],
): [Person[], (params: URLSearchParams) => void] {
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  const filter = (params: URLSearchParams) => {
    const paramsExist = params.toString() !== '';

    if (!paramsExist) {
      setFilteredPeople(people);
    } else {
      const filtered = filteredPeople.filter((person: Person) => {
        const personCentury = Math.ceil(person.born / 100).toString();
        const paramsQuery = params.get('query') || '';

        const hasMatchingCentury = params
          .getAll('century')
          .includes(personCentury);
        const hasMatchingSex = person.sex === params.get('sex');
        const hasMatchingName = person.name.includes(paramsQuery);

        return hasMatchingCentury || hasMatchingSex || hasMatchingName;
      });

      setFilteredPeople(filtered);
    }
  };

  return [filteredPeople, filter];
}
