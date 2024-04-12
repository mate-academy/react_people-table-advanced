import React from 'react';

import cn from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { PersonInfo } from './PersonInfo';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import { SearchLink } from './SearchLink';
import { getFilterPeople } from '../utils/getFilterPeople';
import { getSortPeople } from '../utils/getSortPeople';

const COLUMN_NAMES = ['Name', 'Sex', 'Born', 'Died'];

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { search } = useLocation();
  const [searchParams] = useSearchParams(search);

  const preperedPeople = getPreparedPeople(people);

  const order = searchParams.get('order');
  const sort = searchParams.get('sort');

  const toggleSortOptions = (fieldSort: string) => {
    const sortedField = fieldSort.toLowerCase();

    if (sortedField === sort && order) {
      return { sort: null, order: null };
    }

    const newOrder = sortedField === sort ? 'desc' : null;

    return { sort: sortedField, order: newOrder };
  };

  const filteredPeople = getFilterPeople(preperedPeople, searchParams);
  const sortPeople = getSortPeople(filteredPeople, searchParams);

  {
    return sortPeople.length ? (
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {COLUMN_NAMES.map(nameColumn => {
              const isSort = sort === `${nameColumn.toLowerCase()}`;
              const isOrder = order === 'desc';

              return (
                <th key={nameColumn}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {nameColumn}
                    <SearchLink params={toggleSortOptions(nameColumn)}>
                      <span className="icon">
                        <i
                          className={cn('fas', {
                            'fa-sort': !isSort,
                            'fa-sort-up': isSort && !order,
                            'fa-sort-down': isSort && isOrder,
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>
              );
            })}

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {sortPeople.map(person => (
            <PersonInfo key={person.slug} person={person} />
          ))}
        </tbody>
      </table>
    ) : (
      <p>There are no people matching the current search criteria</p>
    );
  }
};
