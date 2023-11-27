import { Person } from '../types';
import { ColumnNames } from '../types/ColumnNames';

interface PeopleFilterOptions {
  people: Person[];
  searchParams: URLSearchParams;
}

export const getVisiblePeople = ({
  people,
  searchParams,
}: PeopleFilterOptions) => {
  let visiblePeople = [...people].map(person => ({
    ...person,
    century: String(Math.ceil(person.born / 100)),
  }));

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    visiblePeople = visiblePeople.filter(
      (person) => person.name.toLowerCase().includes(normalizedQuery)
        || person.motherName?.toLowerCase().includes(normalizedQuery)
        || person.fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(
      (person) => person.sex === sex,
    );
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => (
      centuries.includes(person.century)
    ));
  }

  if (sort) {
    visiblePeople.sort((a, b) => {
      switch (sort) {
        case ColumnNames.Name:
          return a.name.localeCompare(b.name);

        case ColumnNames.Sex:
          return a.sex.localeCompare(b.sex);

        case ColumnNames.Born:
          return a.born - b.born;

        case ColumnNames.Died:
          return a.died - b.died;

        default:
          return 0;
      }
    });

    if (order === 'desc') {
      visiblePeople.reverse();
    }
  }

  return visiblePeople;
};
