/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types/Person';

interface PeopleTableProps {
  people: Person[];
  searchParams: URLSearchParams;
  onSearchParamsChange: (params: URLSearchParams) => void;
  filters: {
    sort: string | null;
    order: 'asc' | 'desc';
  };
  selectedSlug: string | null;
}

export const PeopleTable = ({
  people,
  searchParams,
  onSearchParamsChange,
  filters,
  selectedSlug,
}: PeopleTableProps) => {
  const handleSortClick = (field: string) => {
    const newParams = new URLSearchParams(searchParams);
    const currentSort = newParams.get('sort');
    const currentOrder = newParams.get('order');

    if (currentSort === field) {
      if (currentOrder === 'desc') {
        newParams.delete('sort');
        newParams.delete('order');
      } else {
        newParams.set('order', 'desc');
      }
    } else {
      newParams.set('sort', field);
      newParams.delete('order');
    }

    onSearchParamsChange(newParams);
  };

  const renderSortIcon = (field: string) => {
    if (filters.sort !== field) {
      return <i className="fas fa-sort" />;
    }

    if (filters.order === 'desc') {
      return <i className="fas fa-sort-down" />;
    }

    return <i className="fas fa-sort-up" />;
  };

  const getPersonLink = (slug: string) => {
    const query = searchParams.toString();

    return query ? `#/people/${slug}?${query}` : `#/people/${slug}`;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a
                onClick={() => handleSortClick('name')}
                style={{ cursor: 'pointer' }}
              >
                <span className="icon">{renderSortIcon('name')}</span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                onClick={() => handleSortClick('sex')}
                style={{ cursor: 'pointer' }}
              >
                <span className="icon">{renderSortIcon('sex')}</span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                onClick={() => handleSortClick('born')}
                style={{ cursor: 'pointer' }}
              >
                <span className="icon">{renderSortIcon('born')}</span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                onClick={() => handleSortClick('died')}
                style={{ cursor: 'pointer' }}
              >
                <span className="icon">{renderSortIcon('died')}</span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <a
                href={getPersonLink(person.slug)}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
                data-sex={person.sex}
              >
                {person.name}
              </a>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother ? (
                <a
                  href={getPersonLink(person.mother.slug)}
                  className={person.mother.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.mother.name}
                </a>
              ) : (
                person.motherName || '-'
              )}
            </td>

            <td>
              {person.father ? (
                <a href={getPersonLink(person.father.slug)}>
                  {person.father.name}
                </a>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
