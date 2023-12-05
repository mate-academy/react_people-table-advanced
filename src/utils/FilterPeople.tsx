import { Person } from '../types';
import { Filters } from '../types/Filters';

export function filterPeople(people: Person[], filters: Filters) {
  let peopleCopy = [...people];
  const query = filters.query || '';

  Object.keys(filters).forEach((key) => {
    if (filters[key as keyof Filters]) {
      switch (key) {
        case 'centuries':
          if (filters.centuries?.length !== 0) {
            peopleCopy = peopleCopy
              .filter((person: Person) => filters
                .centuries?.includes(Math.ceil(person.born / 100)
                  .toString()));
          }

          break;

        case 'sex':
          peopleCopy = peopleCopy
            .filter((person: Person) => person.sex === filters.sex);
          break;

        case 'query':
          peopleCopy = peopleCopy
            .filter((person: Person) => person.name.toLowerCase()
              .includes(query?.toLowerCase().trim())
              || person.fatherName?.toLowerCase()
                .includes(query?.toLowerCase().trim())
              || person.motherName?.toLowerCase()
                .includes(query?.toLowerCase().trim()));
          break;

        default:
          break;
      }
    }
  });

  return peopleCopy;
}
