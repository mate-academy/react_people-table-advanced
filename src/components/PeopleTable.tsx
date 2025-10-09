/* eslint-disable import/extensions */
import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const toggleSort = (field: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (sort !== field) {
      // new column: start ascending
      newParams.set('sort', field);
      newParams.delete('order');
    } else if (!order) {
      // currently ascending → switch to descending
      newParams.set('order', 'desc');
    } else {
      // currently descending → remove sort
      newParams.delete('sort');
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  const renderArrow = (field: string) => {
    if (sort !== field) {
      return '↕️';
    }

    if (order === 'desc') {
      return '▼';
    }

    return '▲';
  };

  return (
    <table className="table is-striped is-hoverable is-narrow is-fullwidth">
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th
              key={field}
              onClick={() => toggleSort(field)}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              {field[0].toUpperCase() + field.slice(1)} {renderArrow(field)}
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr key={person.slug}>
            <td>
              <Link
                to={{ pathname: `/people/${person.slug}`, search }}
                data-cy="personLink"
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{person.motherName || '-'}</td>
            <td>{person.fatherName || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
