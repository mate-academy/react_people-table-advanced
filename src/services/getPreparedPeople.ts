import type { Person } from '../types';
import { PeopleSearchParams } from '../types/PeopleSearchParams';

export function getPreparedPeople(
  peopleList: Person[] | null,
  params: PeopleSearchParams,
) {
  const { query, sex, centuries, sort, order } = params;
  let preparedPeople = [...(peopleList || [])];

  if (query) {
    const lowerQuery = query.trim().toLowerCase();

    preparedPeople = preparedPeople.filter(person =>
      [person.name, person.motherName, person.fatherName]
        .filter(Boolean)
        .some(name => name!.toLowerCase().includes(lowerQuery)),
    );
  }

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (centuries && centuries.length > 0) {
    preparedPeople = preparedPeople.filter(person => {
      const personCentury = Math.floor(person.born / 100 + 1);

      return centuries.includes(personCentury);
    });
  }

  if (sort) {
    preparedPeople.sort((a, b) => {
      const desc = order === 'desc'; // true только если явно desc

      switch (sort) {
        case 'name':
        case 'sex':
          return desc
            ? String(b[sort]).localeCompare(String(a[sort]))
            : String(a[sort]).localeCompare(String(b[sort]));
        case 'born':
        case 'died':
          return desc
            ? (b[sort] as number) - (a[sort] as number)
            : (a[sort] as number) - (b[sort] as number);
        default:
          return 0;
      }
    });
  }

  return preparedPeople;
}
