/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SortBy } from '../types/SortBy';

type Props = {
  peopleList: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortField = (field: SortBy) => {
    if (field === sort && order) {
      return null;
    }

    return field;
  };

  const sortOrder = (field: SortBy) => {
    if ((field !== sort && !order)
      || (field === sort && order)) {
      return null;
    }

    return 'desc';
  };

  const getClassIcon = (field: string) => classNames(
    'fas',
    { 'fa-sort': sort !== field },
    { 'fa-sort-up': sort === field && !order },
    { 'fa-sort-down': sort === field && order },
  );

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
              <SearchLink params={{
                sort: sortField(SortBy.Name),
                order: sortOrder(SortBy.Name),
              }}
              >
                <span className="icon">
                  <i className={getClassIcon(SortBy.Name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  sort: sortField(SortBy.Sex),
                  order: sortOrder(SortBy.Sex),
                }}
              >
                <span className="icon">
                  <i className={getClassIcon(SortBy.Sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  sort: sortField(SortBy.Born),
                  order: sortOrder(SortBy.Born),
                }}
              >
                <span className="icon">
                  <i className={getClassIcon(SortBy.Born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={{
                sort: sortField(SortBy.Died),
                order: sortOrder(SortBy.Died),
              }}
              >
                <span className="icon">
                  <i className={getClassIcon(SortBy.Died)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleList.map(person => (
          <PersonLink
            peopleList={peopleList}
            person={person}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
