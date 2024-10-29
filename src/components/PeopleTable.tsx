/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';
import { getSearchWith } from '../utils/searchHelper';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { sortableColumns } from '../constants/sortableColumns';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  function handleSorting(sortField: string) {
    return sort !== sortField
      ? getSearchWith(searchParams, { sort: sortField, order: null })
      : !order
        ? getSearchWith(searchParams, { order: 'desc' })
        : getSearchWith(searchParams, { order: null, sort: null });
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortableColumns.map(columnName => {
            const lowerName = columnName.toLowerCase();

            return (
              <th key={columnName}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {columnName}
                  <Link to={{ search: handleSorting(lowerName) }}>
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': sort !== lowerName,
                          'fa-sort-up': sort === lowerName && !order,
                          'fa-sort-down': sort === lowerName && order,
                        })}
                      />
                    </span>
                  </Link>
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
          return <PersonInfo person={person} key={person.slug} />;
        })}
      </tbody>
    </table>
  );
};
