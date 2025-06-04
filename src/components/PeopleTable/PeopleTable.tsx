import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  people: Person[];
  selectedPersonSlug?: string;
};

type SortableFields = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortField = searchParams.get('sort') as SortableFields | null;
  const order = searchParams.get('order');

  const handleSort = (field: SortableFields) => {
    if (sortField !== field) {
      setSearchParams(
        getSearchWith(searchParams, {
          sort: field,
          order: null,
        }),
      );

      return;
    }

    if (!order) {
      setSearchParams(getSearchWith(searchParams, { order: 'desc' }));

      return;
    }

    setSearchParams(
      getSearchWith(searchParams, {
        sort: null,
        order: null,
      }),
    );
  };

  const getSortedPeople = () => {
    if (!sortField) {
      return people;
    }

    return [...people].sort((a: Person, b: Person) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'name') {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      }

      if (aValue === bValue) {
        return 0;
      }

      const result = aValue > bValue ? 1 : -1;

      return order === 'desc' ? -result : result;
    });
  };

  const getSortIcon = (field: SortableFields) => {
    const baseClass =
      sortField === field ? 'has-text-link' : 'has-text-grey-light sort-icon';

    if (sortField !== field) {
      return (
        <span className="icon">
          <i className={`fas fa-sort ${baseClass}`} />
        </span>
      );
    }

    return (
      <span className="icon">
        <i
          className={`fas fa-sort-${order === 'desc' ? 'down' : 'up'} ${baseClass}`}
        />
      </span>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => handleSort('name')} className="is-clickable">
            Name{getSortIcon('name')}
          </th>
          <th onClick={() => handleSort('sex')} className="is-clickable">
            Sex{getSortIcon('sex')}
          </th>
          <th onClick={() => handleSort('born')} className="is-clickable">
            Born{getSortIcon('born')}
          </th>
          <th onClick={() => handleSort('died')} className="is-clickable">
            Died{getSortIcon('died')}
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {getSortedPeople().map(person => {
          const mother = people.find(p => p.name === person.motherName) || null;
          const father = people.find(p => p.name === person.fatherName) || null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                person.slug === selectedPersonSlug
                  ? 'has-background-warning'
                  : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
