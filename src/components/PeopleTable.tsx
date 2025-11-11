import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams<{ personSlug: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const handleSort = (column: string) => {
    const newParams = new URLSearchParams(location.search);

    if (currentSort !== column) {
      // First click → ascending
      newParams.set('sort', column);
      newParams.set('order', 'asc');
    } else if (currentOrder === 'asc') {
      // Second click → descending
      newParams.set('order', 'desc');
    } else if (currentOrder === 'desc') {
      // Third click → clear sorting
      newParams.delete('sort');
      newParams.delete('order');
    } else {
      // Default to ascending if somehow undefined
      newParams.set('sort', column);
      newParams.set('order', 'asc');
    }

    navigate({ search: newParams.toString() });
  };

  const getSortIcon = (column: string) => {
    if (currentSort !== column) {
      return 'fas fa-sort';
    }

    if (currentOrder === 'asc') {
      return 'fas fa-sort-up';
    }

    if (currentOrder === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(col => (
            <th
              key={col}
              onClick={() => handleSort(col)}
              style={{ cursor: 'pointer' }}
            >
              <span className="is-flex is-flex-wrap-nowrap">
                {col.charAt(0).toUpperCase() + col.slice(1)}
                <span className="icon">
                  <i className={getSortIcon(col)} />
                </span>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === personSlug,
            })}
          >
            <td>
              <PersonLink name={person.name} person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink person={person.mother} name={person.motherName} />
            </td>
            <td>
              <PersonLink person={person.father} name={person.fatherName} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
