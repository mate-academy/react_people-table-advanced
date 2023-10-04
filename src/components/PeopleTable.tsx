import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { SearchParams } from '../utils/searchHelper';
import { SortFields } from '../types/SortFields';
import { QueryParamsType } from '../types/QueryParamsType';
import { DESCENDING } from '../utils/variables';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(QueryParamsType.Sort);
  const isOrder = searchParams.has(QueryParamsType.Order);
  const query = searchParams.get(QueryParamsType.Query);

  function getSortQuery(sortField: SortFields): SearchParams {
    if (sort === sortField) {
      return isOrder
        ? { sort: null, order: null }
        : { sort: sortField, order: DESCENDING };
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
              <SearchLink
                params={getSortQuery(SortFields.Name)}
              >
                <span className="icon">
                  <i className={classNames('fas',
                    {
                      'fa-sort': query !== SortFields.Name,
                      'fa-sort-up': sort === SortFields.Name && !isOrder,
                      'fa-sort-down': sort === SortFields.Name && isOrder,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={getSortQuery(SortFields.Sex)}
              >
                <span className="icon">
                  <i className={classNames('fas',
                    {
                      'fa-sort': query !== SortFields.Sex,
                      'fa-sort-up': sort === SortFields.Sex && !isOrder,
                      'fa-sort-down': sort === SortFields.Sex && isOrder,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={getSortQuery(SortFields.Born)}
              >
                <span className="icon">
                  <i className={classNames('fas',
                    {
                      'fa-sort': query !== SortFields.Born,
                      'fa-sort-up': sort === SortFields.Born && !isOrder,
                      'fa-sort-down': sort === SortFields.Born && isOrder,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={getSortQuery(SortFields.Died)}
              >
                <span className="icon">
                  <i className={classNames('fas',
                    {
                      'fa-sort': query !== SortFields.Died,
                      'fa-sort-up': sort === SortFields.Died && !isOrder,
                      'fa-sort-down': sort === SortFields.Died && isOrder,
                    })}
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
          <PersonItem
            person={person}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
