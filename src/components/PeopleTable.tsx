import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import React from 'react';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { SortFields } from '../types/SortFields';
// import { COLUMN_NAMES } from '../utils/variables';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  function getSortQuery(sortField: SortFields): SearchParams {
    if (searchParams.has('sort') && searchParams.get('sort') === sortField) {
      if (searchParams.has('order')) {
        return { sort: null, order: null };
      }

      return { sort: sortField, order: 'desc' };
    }

    return { sort: sortField, order: null };
  }

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
              <Link
                to={{
                  search: getSearchWith(
                    searchParams,
                    getSortQuery(SortFields.Name),
                  ),
                }}
              >
                <span className="icon">
                  <i className={classNames('fas',
                    {
                      'fa-sort': searchParams.get('sort') !== SortFields.Name,
                      'fa-sort-up': searchParams.get('sort') === SortFields.Name
                        && !searchParams.has('order'),
                      'fa-sort-down':
                        searchParams.get('sort') === SortFields.Name
                      && searchParams.has('order'),
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: getSearchWith(
                    searchParams,
                    getSortQuery(SortFields.Sex),
                  ),
                }}
              >
                <span className="icon">
                  <i className={classNames('fas',
                    {
                      'fa-sort': searchParams.get('sort') !== SortFields.Sex,
                      'fa-sort-up': searchParams.get('sort') === SortFields.Sex
                        && !searchParams.has('order'),
                      'fa-sort-down':
                        searchParams.get('sort') === SortFields.Sex
                      && searchParams.has('order'),
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: getSearchWith(
                    searchParams,
                    getSortQuery(SortFields.Born),
                  ),
                }}
              >
                <span className="icon">
                  <i className={classNames('fas',
                    {
                      'fa-sort': searchParams.get('sort') !== SortFields.Born,
                      'fa-sort-up': searchParams.get('sort') === SortFields.Born
                        && !searchParams.has('order'),
                      'fa-sort-down':
                        searchParams.get('sort') === SortFields.Born
                      && searchParams.has('order'),
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search: getSearchWith(
                    searchParams,
                    getSortQuery(SortFields.Died),
                  ),
                }}
              >
                <span className="icon">
                  <i className={classNames('fas',
                    {
                      'fa-sort': searchParams.get('sort') !== SortFields.Died,
                      'fa-sort-up': searchParams.get('sort') === SortFields.Died
                        && !searchParams.has('order'),
                      'fa-sort-down':
                        searchParams.get('sort') === SortFields.Died
                      && searchParams.has('order'),
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonItem
            person={person}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
