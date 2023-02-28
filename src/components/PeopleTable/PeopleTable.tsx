import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';
import { TablePerson } from '../TablePerson';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = (
  {
    people,
  },
) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const setSortingParams = (sortBy: string) => {
    if (!sort || sort !== sortBy) {
      return {
        sort: sortBy,
        order: null,
      };
    }

    if (sort === sortBy && !order) {
      return {
        sort: sortBy,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
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
              <SearchLink
                params={setSortingParams('name')}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    {
                      'fa-sort': !sort || sort !== 'name',
                      'fa-sort-up': sort === 'name' && !order,
                      'fa-sort-down': sort === 'name' && order,
                    },
                  )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={setSortingParams('sex')}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    {
                      'fa-sort': !sort || sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && !order,
                      'fa-sort-down': sort === 'sex' && order,
                    },
                  )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={setSortingParams('born')}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    {
                      'fa-sort': !sort || sort !== 'born',
                      'fa-sort-up': sort === 'born' && !order,
                      'fa-sort-down': sort === 'born' && order,
                    },
                  )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={setSortingParams('died')}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    {
                      'fa-sort': !sort || sort !== 'died',
                      'fa-sort-up': sort === 'died' && !order,
                      'fa-sort-down': sort === 'died' && order,
                    },
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
        {people.map(person => (
          <TablePerson
            person={person}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
