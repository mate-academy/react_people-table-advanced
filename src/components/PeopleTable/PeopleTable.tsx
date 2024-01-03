import React from 'react';
import cn from 'classnames';

import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonRow } from '../PersonRow';
import { Params } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

const COLUMN_NAMES = [
  'Name',
  'Sex',
  'Born',
  'Died',
];

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortgParams = (sortBy: string): Params => {
    if (sort !== sortBy) {
      return { sort: sortBy, order: null };
    }

    if (!order) {
      return { order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getIconCondition = (sortBy: string): string => {
    return cn('fas', {
      'fa-sort': sort !== sortBy,
      'fa-sort-up': sort === sortBy && !order,
      'fa-sort-down': sort === sortBy && order,
    });
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMN_NAMES.map((column) => {
            const columnLowered = column.toLowerCase();

            return (
              <th key={crypto.randomUUID()}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {column}
                  <SearchLink params={getSortgParams(columnLowered)}>
                    <span className="icon">
                      <i className={getIconCondition(columnLowered)} />
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
        {people.map((person) => {
          return (
            <PersonRow people={people} person={person} key={person.slug} />
          );
        })}
      </tbody>
    </table>
  );
};
