import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SortField } from '../types/SortField';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || SortField.All;
  const sortOrder = searchParams.get('order') || null;

  const handleSortParams = (field: SortField) => {
    if (sortField === field && sortOrder) {
      return {
        sort: null,
        order: null,
      };
    }

    if (sortField === field && !sortOrder) {
      return {
        sort: field,
        order: 'desc',
      };
    }

    return {
      sort: field,
      order: null,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped
    is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={handleSortParams(SortField.NAME)}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortField !== SortField.NAME,
                    'fa-sort-up': sortField === SortField.NAME
                      && !sortOrder,
                    'fa-sort-down': sortField === SortField.NAME
                      && sortOrder,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleSortParams(SortField.NAME)}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortField !== SortField.NAME,
                    'fa-sort-up': sortField === SortField.NAME
                      && !sortOrder,
                    'fa-sort-down': sortField === SortField.NAME
                      && sortOrder,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleSortParams(SortField.SEX)}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortField !== SortField.SEX,
                    'fa-sort-up': sortField === SortField.SEX
                      && !sortOrder,
                    'fa-sort-down': sortField === SortField.SEX
                      && sortOrder,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleSortParams(SortField.DIED)}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortField !== SortField.DIED,
                    'fa-sort-up': sortField === SortField.DIED
                      && !sortOrder,
                    'fa-sort-down': sortField === SortField.DIED
                      && sortOrder,
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
          <PersonLink
            key={person.slug}
            people={people}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
