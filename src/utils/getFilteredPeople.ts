import { Person } from '../types';

export const getFilteredPeople = (
  people: Person[], filters: URLSearchParams,
) => {
  let filteredPeople = [...people];
  const query = filters.get('query') || '';
  const sort = filters.get('sort') || '';
  const order = filters.get('order') || '';
  const centuries = filters.getAll('centuries') || [];
  const sex = filters.get('sex') || 'All';

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(
      person => centuries.includes(
        Math.ceil(person.born / 100).toString(),
      ),
    );
  }

  if (sex !== 'All') {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    const validQuery = query.toLocaleLowerCase().trim();

    filteredPeople = filteredPeople.filter(
      (person) => person.name.toLocaleLowerCase().includes(validQuery)
    || person.fatherName?.toLocaleLowerCase().includes(validQuery)
    || person.motherName?.toLocaleLowerCase().includes(validQuery),
    );
  }

  if (sort) {
    switch (sort) {
      case 'name':
      case 'sex':
        filteredPeople = filteredPeople.sort((person1, person2) => {
          return (order === 'desc')
            ? person2[sort].localeCompare(person1[sort])
            : person1[sort].localeCompare(person2[sort]);
        });
        break;
      case 'born':
      case 'died':
        filteredPeople = filteredPeople.sort((person1, person2) => {
          return (order === 'desc')
            ? person2[sort] - person1[sort]
            : person1[sort] - person2[sort];
        });
        break;
      default:
    }
  }

  return filteredPeople;
};
