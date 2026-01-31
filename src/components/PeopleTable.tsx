// import { useEffect, useState } from 'react';
import { usePeople } from './PeopleContext';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

type SortBy = 'name' | 'sex' | 'born' | 'died';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const [searchParams] = useSearchParams();
  const { visiblePeople } = usePeople();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const getSorting = (sortBy: SortBy) => {
    if (currentSort === null) {
      return { sort: sortBy, order: null };
    }

    if (currentSort === sortBy) {
      if (currentOrder === 'desc') {
        return { sort: null, order: null };
      } else {
        return { sort: sortBy, order: 'desc' };
      }
    } else {
      return { sort: sortBy, order: null };
    }
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={getSorting('name')}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      currentSort === 'name' && currentOrder !== 'desc'
                        ? 'fa-sort-up'
                        : currentSort === 'name' && currentOrder === 'desc'
                          ? 'fa-sort-down'
                          : 'fa-sort',
                    )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSorting('sex')}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      currentSort === 'sex' && currentOrder !== 'desc'
                        ? 'fa-sort-up'
                        : currentSort === 'sex' && currentOrder === 'desc'
                          ? 'fa-sort-down'
                          : 'fa-sort',
                    )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSorting('born')}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      currentSort === 'born' && currentOrder !== 'desc'
                        ? 'fa-sort-up'
                        : currentSort === 'born' && currentOrder === 'desc'
                          ? 'fa-sort-down'
                          : 'fa-sort',
                    )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSorting('died')}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      currentSort === 'died' && currentOrder !== 'desc'
                        ? 'fa-sort-up'
                        : currentSort === 'died' && currentOrder === 'desc'
                          ? 'fa-sort-down'
                          : 'fa-sort',
                    )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
