import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';
import { PeopleRow } from './PeopleRow';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  slug: string | undefined;
};

const tableColumns = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people, slug }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const makeOrder = (col: string) => {
    if (sort === col) {
      return order ? '' : 'desc';
    }

    return '';
  };

  const chooseSortField = (col: string) => {
    if (sort === col && order === 'desc') {
      return '';
    }

    return col;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {
            tableColumns.map(tableColumn => (
              <th key={tableColumn}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {tableColumn}
                  <SearchLink
                    params={{
                      sort: chooseSortField(tableColumn) || '',
                      order: makeOrder(tableColumn) || '',
                    }}
                  >
                    <span className="icon">
                      <i className={classNames('fas', {
                        'fa-sort': sort !== tableColumn,
                        'fa-sort-up': sort === tableColumn && order !== 'desc',
                        'fa-sort-down': sort === tableColumn
                          && order === 'desc',
                      })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            ))
          }

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {
          people.map(person => (
            <PeopleRow
              key={person.slug}
              people={people}
              person={person}
              slug={slug}
            />
          ))
        }
      </tbody>
    </table>
  );
};
