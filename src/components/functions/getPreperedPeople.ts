// I decided to iplement my own filter
import { Person } from '../../types';

const sortPeople = (filter: string, allPeople: Person[]) => {
  const newInitioalPeople = [...allPeople];

  switch (filter) {
    case 'name':
    case 'sex':
      return newInitioalPeople.sort((per1, per2) =>
        per1[filter].localeCompare(per2[filter]),
      );
    case 'born':
    case 'died':
      return newInitioalPeople.sort(
        (per1, per2) => per1[filter] - per2[filter],
      );

    default:
      return newInitioalPeople;
  }
};

export function getPreperedPeople(
  initialPeople: Person[],
  searchParams: URLSearchParams,
) {
  const sortBy = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  let preperedPeople = sortBy
    ? sortPeople(sortBy, initialPeople)
    : initialPeople;

  if (order) {
    preperedPeople = preperedPeople.reverse();
  }

  if (query) {
    const normalazedQuery = query.toLowerCase();

    preperedPeople = preperedPeople.filter(
      p =>
        p.name.toLowerCase().includes(normalazedQuery) ||
        p.fatherName?.toLowerCase().includes(normalazedQuery) ||
        p.motherName?.includes(normalazedQuery),
    );
  }

  if (sex) {
    preperedPeople = preperedPeople.filter(p => p.sex === sex);
  }

  if (!!centuries.length) {
    preperedPeople = preperedPeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return centuries.includes(century);
    });
  }

  return preperedPeople;
}
