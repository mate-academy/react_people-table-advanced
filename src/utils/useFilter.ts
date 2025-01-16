import { Person } from '../types';
import { useState } from 'react';

export function useFilter() {
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  const filter = (people: Person[], params: URLSearchParams) => {
    const paramsExist = params.toString() !== '';

    if (!paramsExist) {
      setFilteredPeople(people);
    } else {
      const filtered = filteredPeople.filter((person: Person) => {
        const personCentury = Math.ceil(person.born / 100).toString();
        const paramsQuery = params.get('query');

        if (
          params.getAll('century').includes(personCentury) ||
          person.sex === params.get('sex') ||
          (paramsQuery && person.name.includes(paramsQuery))
        ) {
          return person;
        }
      });

      setFilteredPeople(filtered);
    }
  };

  return [filteredPeople, filter];
}
