import React, { useState } from 'react';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import classNames from 'classnames';
import { SetURLSearchParams } from 'react-router-dom';

interface Props {
  peoples: Person[];
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export const PeopleTable: React.FC<Props> = ({
  peoples,
  searchParams,
  setSearchParams,
}) => {
  const columns = ['name', 'sex', 'born', 'died'];
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('');

  const sortPeople = () => {
    if (order === '') {
      return peoples;
    }

    const sortedPeople = [...peoples].sort((a, b) => {
      const aValue = String(a[sortBy as keyof Person]);
      const bValue = String(b[sortBy as keyof Person]);

      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sortedPeople;
  };

  const handleSort = (newSortBy: string) => {
    let newOrder = 'asc';

    if (sortBy === newSortBy) {
      if (order === 'asc') {
        newOrder = 'desc';
      } else if (order === 'desc') {
        newOrder = '';
      }
    }

    setSortBy(newSortBy);
    setOrder(newOrder);

    searchParams.set('sort', newSortBy);
    if (newOrder === 'desc') {
      searchParams.set('order', newOrder);
    } else {
      searchParams.delete('order');
    }

    setSearchParams(searchParams);
  };

  const sortedPeople = sortPeople();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column.charAt(0).toUpperCase() + column.slice(1)}
                <a onClick={() => handleSort(column)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort-up': sortBy === column && order === 'asc',
                        'fa-sort-down': sortBy === column && order === 'desc',
                        'fa-sort': sortBy !== column || order === '',
                      })}
                    />
                  </span>
                </a>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <PersonItem person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
