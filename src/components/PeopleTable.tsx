/* eslint-disable jsx-a11y/control-has-associated-label */
import { PersonBody } from './PersonBody';
import { Person } from '../types';
import React from 'react';
import { filterableColumns } from '../constants/filterableColumns';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
  chosenId?: string;
  searchParams: URLSearchParams;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  chosenId,
  searchParams,
}) => {
  const sortType = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const getSortAndDirection = (sortParameter: string) => {
    const isOrderDesc = sortOrder === 'desc';

    return {
      sort: isOrderDesc ? null : sortParameter,
      order: sortType === sortParameter && !isOrderDesc ? 'desc' : null,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {filterableColumns.map(column => {
            return (
              <th key={column}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {column}
                  <SearchLink
                    params={getSortAndDirection(column.toLowerCase())}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': sortType !== column.toLowerCase(),
                          'fa-sort-up':
                            sortType === column.toLowerCase() && !sortOrder,
                          'fa-sort-down':
                            sortType === column.toLowerCase() && !!sortOrder,
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
        {people.map(person => {
          return (
            <PersonBody chosenId={chosenId} person={person} key={person.slug} />
          );
        })}
      </tbody>
    </table>
  );
};
