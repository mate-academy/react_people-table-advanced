import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface PeopleTableProps {
  people: Person[] | undefined;
}

const getNextSortOrder = (currentOrder: string | null): string | null => {
  switch (currentOrder) {
    case 'asc':
      return 'desc';
    case 'desc':
      return null;
    default:
      return 'asc';
  }
};

export function PeopleTable({ people }: PeopleTableProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const handleSort = (field: string) => {
    const nextOrder =
      currentSort === field ? getNextSortOrder(currentOrder) : 'asc';

    if (nextOrder) {
      setSearchParams({ sort: field, order: nextOrder });
    } else {
      setSearchParams({});
    }
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th
              key={field}
              onClick={() => handleSort(field)}
              style={{ cursor: 'pointer' }}
            >
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <span className="icon">
                  <i
                    className={`fas fa-sort${currentSort === field ? (currentOrder === 'asc' ? '-up' : '-down') : ''}`}
                  />
                </span>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map(person => (
          <PersonLink key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
}
