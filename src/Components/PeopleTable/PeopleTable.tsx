import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../Types/Person';
import { PersonRow } from '../PersonRow';
import './PeopleTable.scss';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = React.memo(({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const handleSortChange = useCallback((event: React.MouseEvent) => {
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
  }, [sortOrder, sortBy, query]);

  const findParent = useCallback((name: string): Person | undefined => {
    return people.find(person => person.name === name);
  }, [people]);

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th
            onClick={handleSortChange}
            className={classNames(
              'table__sort',
              {
                'table__sort--asc': sortBy === 'name' && sortOrder === 'asc',
                'table__sort--desc': sortBy === 'name' && sortOrder === 'desc',
              },
            )}
          >
            Name
          </th>
          <th
            onClick={handleSortChange}
            className={classNames(
              'table__sort',
              {
                'table__sort--asc': sortBy === 'sex' && sortOrder === 'asc',
                'table__sort--desc': sortBy === 'sex' && sortOrder === 'desc',
              },
            )}
          >
            Sex
          </th>
          <th
            onClick={handleSortChange}
            className={classNames(
              'table__sort',
              {
                'table__sort--asc': sortBy === 'born' && sortOrder === 'asc',
                'table__sort--desc': sortBy === 'born' && sortOrder === 'desc',
              },
            )}
          >
            Born
          </th>
          <th
            onClick={handleSortChange}
            className={classNames(
              'table__sort',
              {
                'table__sort--asc': sortBy === 'died' && sortOrder === 'asc',
                'table__sort--desc': sortBy === 'died' && sortOrder === 'desc',
              },
            )}
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
            key={person.slug}
            person={person}
            father={findParent(person.fatherName)}
            mother={findParent(person.motherName)}
          />
        ))}
      </tbody>
    </table>
  );
});
