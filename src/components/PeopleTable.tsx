import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonType } from '../types';
import { Person } from './Person';
import { COLUMNS_NAMES_NO_SORT, SortTypes } from '../utils/constats';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  people: PersonType[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  function handleSort(newSortType: string): SearchParams {
    const isFirstClick = sort !== newSortType;
    const isSecondClick = sort === newSortType && !order;

    if (isFirstClick) {
      return { sort: newSortType, order: null };
    }

    if (isSecondClick) {
      return { sort: newSortType, order: 'desc' };
    }

    return { sort: null, order: null };
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortTypes).map(([key, value]) => {
            const sortParams = handleSort(value);

            return (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <SearchLink params={sortParams}>
                    <span className="icon">
                      <i className={cn('fas', {
                        'fa-sort': sort !== value,
                        'fa-sort-up': sort === value && !order,
                        'fa-sort-down': sort === value && order,
                      })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          {COLUMNS_NAMES_NO_SORT.map(columnName => (
            <th key={columnName}>
              {columnName}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <Person person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
