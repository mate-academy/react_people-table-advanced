/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchParams } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const SORT_BY_COLUMNS = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const order = searchParams.get('order');
  const sort = searchParams.get('sort');

  const getSortingParams = (sortBy: string): SearchParams => {
    const preparedSort = sortBy.toLowerCase();

    if (sort !== preparedSort) {
      return { sort: preparedSort, order: null };
    }

    if (!order) {
      return { order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIconClassName = (sortBy: string): string => {
    const preparedSort = sortBy.toLowerCase();

    return cn('fas', {
      'fa-sort': preparedSort !== sort,
      'fa-sort-up': preparedSort === sort && !order,
      'fa-sort-down': preparedSort === sort && order,
    });
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_BY_COLUMNS.map(column => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column}
                <SearchLink params={getSortingParams(column)}>
                  <span className="icon">
                    <i className={getSortIconClassName(column)} />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(pers => (
          <PersonLink key={pers.slug} person={pers} />
        ))}
      </tbody>
    </table>
  );
};
