/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useState } from 'react';
import cn from 'classnames';

import { Person as PersonType } from '../types';
import { Person } from './Person';

type Props = {
  people: PersonType[];
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
};

export const PeopleTable = ({
  people,
  searchParams,
  setSearchParams,
}: Props) => {
  const sortOptions = ['name', 'sex', 'born', 'died'];
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('');

  const sortPeople = () => {
    if (order === '') {
      return people;
    }

    const sortedPeople = [...people].sort((a, b) => {
      const personA = String(a[sortBy as keyof PersonType]);
      const personB = String(b[sortBy as keyof PersonType]);

      if (order === 'asc') {
        return personA > personB ? 1 : -1;
      } else {
        return personA < personB ? 1 : -1;
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
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {sortOptions.map(option => (
              <th key={option}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                  <a onClick={() => handleSort(option)}>
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort-up': sortBy === option && order === 'asc',
                          'fa-sort-down': sortBy === option && order === 'desc',
                          'fa-sort': sortBy !== option || order === '',
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
            <Person person={person} people={people} key={person.slug} />
          ))}
        </tbody>
      </table>
    </>
  );
};
