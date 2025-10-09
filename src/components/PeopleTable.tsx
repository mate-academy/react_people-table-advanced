import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { useCallback } from 'react';
import React from 'react';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSort = useCallback(
    (field: string) => {
      const params = new URLSearchParams(searchParams);

      if (sort !== field) {
        params.set('sort', field);
        params.delete('order');
      } else if (!order) {
        params.set('order', 'desc');
      } else {
        params.delete('sort');
        params.delete('order');
      }

      setSearchParams(params);
    },
    [sort, order, searchParams, setSearchParams],
  );

  const renderArrow = (field: string) => {
    if (sort !== field) {
      return '↕';
    }

    if (order === 'desc') {
      return '↓';
    }

    return '↑';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>Name {renderArrow('name')}</th>
          <th onClick={() => handleSort('sex')}>Sex {renderArrow('sex')}</th>
          <th onClick={() => handleSort('born')}>Born {renderArrow('born')}</th>
          <th onClick={() => handleSort('died')}>Died {renderArrow('died')}</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr key={person.slug}>
            <td>{person.name}</td>
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
