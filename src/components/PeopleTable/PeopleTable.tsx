import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import './PeopleTable.scss';
import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = searchParams.get('sortOrder') || '';
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || '';

  const changeSortParams = (event: React.MouseEvent) => {
    const value = event.currentTarget.textContent?.toLowerCase();

    if (value && sortOrder === '') {
      setSearchParams({ query, sortBy: value, sortOrder: 'asc' });
    }

    if (value && sortOrder === 'desc') {
      setSearchParams({ query, sortBy: value, sortOrder: 'asc' });
    }

    if (value && sortOrder === 'asc') {
      setSearchParams({ query, sortBy: value, sortOrder: 'desc' });
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th
            className={classNames('table__sort', {
              'table__sort--asc': sortOrder === 'asc' && sortBy === 'name',
              'table__sort--desc': sortOrder === 'desc' && sortBy === 'name',
            })}
            onClick={changeSortParams}
          >
            Name
          </th>
          <th
            className={classNames('table__sort', {
              'table__sort--asc': sortOrder === 'asc' && sortBy === 'sex',
              'table__sort--desc': sortOrder === 'desc' && sortBy === 'sex',
            })}
            onClick={changeSortParams}
          >
            Sex
          </th>
          <th
            className={classNames('table__sort', {
              'table__sort--asc': sortOrder === 'asc' && sortBy === 'born',
              'table__sort--desc': sortOrder === 'desc' && sortBy === 'born',
            })}
            onClick={changeSortParams}
          >
            Born
          </th>
          <th
            className={classNames('table__sort', {
              'table__sort--asc': sortOrder === 'asc' && sortBy === 'died',
              'table__sort--desc': sortOrder === 'desc' && sortBy === 'died',
            })}
            onClick={changeSortParams}
          >
            Died
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonRow
            key={person.name}
            person={person}
            people={people}
          />
        ))}
      </tbody>
    </table>
  );
};
