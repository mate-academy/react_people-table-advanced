import React, { useCallback } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { SearchParamsValue } from '../types/SearchParamsValue';
import { SearchParams } from '../utils/searchHelper';
import { TABLE_SORT } from '../constants/TableSort';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  peopleList: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  const [searchParams] = useSearchParams();
  const tableFilters = TABLE_SORT;

  const searchSort = searchParams.get(SearchParamsValue.Sort) || '';
  const searchOrder = searchParams.get(SearchParamsValue.Order) || '';

  const handleSort = useCallback(
    (sortBy: string): SearchParams => {
      if (searchOrder) {
        searchParams.delete(SearchParamsValue.Sort);
        searchParams.delete(SearchParamsValue.Order);

        return { order: null };
      }

      switch (searchSort) {
        case sortBy:
          return { order: 'desc' };

        default:
          return { sort: sortBy };
      }
    },
    [searchSort, searchOrder, searchParams],
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableFilters.map(({ id, title, isSorted }) => (
            <th key={id}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                {isSorted && (
                  <SearchLink params={handleSort(title.toLowerCase())}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': searchSort !== title.toLowerCase(),
                          'fa-sort-up':
                            searchSort === title.toLowerCase() && !searchOrder,
                          'fa-sort-down':
                            searchSort === title.toLowerCase() && searchOrder,
                        })}
                      />
                    </span>
                  </SearchLink>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {peopleList.map(person => (
          <PersonLink key={person.slug} person={person} people={peopleList} />
        ))}
      </tbody>
    </table>
  );
};
