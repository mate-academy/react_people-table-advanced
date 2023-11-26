import { Person } from '../types';

export const getVisiblePeople = (
  recievedPeople: Person[],
  params: URLSearchParams,
) => {
  const sex = params.get('sex') || '';
  const query = params.get('query') || '';
  const centuries = params.getAll('centuries') || [];
  const sort = params.get('sort') || '';
  const order = params.get('order') || '';
  let visiblePeople = [...recievedPeople];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    const normalizedQuery = query.toLowerCase();

    visiblePeople = visiblePeople
      .filter((person) => person.name.toLowerCase().includes(normalizedQuery)
      || person.motherName?.toLowerCase().includes(normalizedQuery)
      || person.fatherName?.toLowerCase().includes(normalizedQuery));
  }

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(century.toString());
    });
  }

  visiblePeople.sort((person1, person2) => {
    switch (sort) {
      case 'name':
        return person1[sort].localeCompare(person2[sort]);
      case 'sex':
        return person1[sort].localeCompare(person2[sort]);
      case 'born':
        return person1[sort] - person2[sort];
      case 'died':
        return person1[sort] - person2[sort];
      default:
        return 0;
    }
  });

  if (order === 'desc') {
    visiblePeople.reverse();
  }

  return visiblePeople;
};
