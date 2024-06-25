import { Options } from '../types/Options';
import { Person } from '../types/Person';

export function getPreparedPeople(people: Person[], options: Options) {
  const { query, sex, centuries, sort, order } = options;

  const preparedPeople = people.filter(person => {
    let matchesCentury = true;
    let matchesSex = true;
    let matchesQuery = true;

    if (centuries.length > 0) {
      const personBornCentury: string = Math.ceil(person.born / 100).toString();

      matchesCentury = centuries.includes(personBornCentury);
    }

    if (sex) {
      matchesSex = sex === person.sex;
    }

    if (query) {
      matchesQuery =
        person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.name?.toLowerCase().includes(query.toLowerCase());
    }

    return matchesCentury && matchesQuery && matchesSex;
  });

  if (sort) {
    preparedPeople.sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]);

        case 'born':
        case 'died':
          return a[sort] - b[sort];

        default:
          return 0;
      }
    });
  }

  if (order) {
    preparedPeople.reverse();
  }

  return preparedPeople;
}
