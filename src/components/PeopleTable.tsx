/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable = ({ people, selectedSlug }: PeopleTableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';

  const handleSort = (field: string) => {
    const currtentSort = searchParams.get('sort');
    const currtentOrder = searchParams.get('order');

    const updated = new URLSearchParams(searchParams);

    if (currtentSort !== field) {
      updated.set('sort', field);
      updated.set('order', 'asc');
    } else if (currtentOrder === 'asc') {
      updated.set('order', 'desc');
    } else {
      updated.delete('sort');
      updated.delete('order');
    }

    setSearchParams(updated);
  };

  const renderSortIcon = (field: string) => {
    if (sort !== field) {
      return <i className="fas fa-sort" />;
    }

    if (order === 'desc') {
      return <i className="fas fa-sort-down" />;
    }

    return <i className="fas fa-sort-up" />;
  };

  if (people.length === 0) {
    return (
      <p className="has-text-centered has-text-grey-light" data-cy="noMatches">
        There are no people matching the current search criteria.
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
            Name{renderSortIcon('name')}
          </th>

          <th onClick={() => handleSort('sex')} style={{ cursor: 'pointer' }}>
            Sex{renderSortIcon('sex')}
          </th>

          <th onClick={() => handleSort('born')} style={{ cursor: 'pointer' }}>
            Born{renderSortIcon('born')}
          </th>

          <th onClick={() => handleSort('died')} style={{ cursor: 'pointer' }}>
            Died{renderSortIcon('died')}
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = person.slug === selectedSlug;

          return (
            <tr
              key={person.slug}
              className={isSelected ? 'has-background-warning' : undefined}
              data-cy="person"
              style={{ cursor: 'pointer' }}
            >
              <td>
                <SearchLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  <SearchLink name={person.motherName} people={people} />
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  <SearchLink name={person.fatherName} people={people} />
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
