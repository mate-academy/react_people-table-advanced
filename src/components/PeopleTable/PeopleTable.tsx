import React from 'react';
import { Person } from '../../types';
import { PersonTable } from '../PersonTable';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

enum SortBy {
  NAME = 'name',
  SEX = 'sex',
  BORN = 'born',
  DIED = 'died',
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const toggleSort = (sortBy: string) => {
    if (sortBy === sort && order) {
      return {
        sort: null,
        order: null,
      };
    }

    if (sortBy === sort) {
      return {
        sort: sortBy,
        order: 'desc',
      };
    }

    return {
      sort: sortBy,
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
              <SearchLink params={toggleSort(SortBy.NAME)}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== SortBy.NAME,
                      'fa-sort-up': sort === SortBy.NAME && !order,
                      'fa-sort-down': sort === SortBy.NAME && order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={toggleSort(SortBy.SEX)}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== SortBy.SEX,
                      'fa-sort-up': sort === SortBy.SEX && !order,
                      'fa-sort-down': sort === SortBy.SEX && order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={toggleSort(SortBy.BORN)}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== SortBy.BORN,
                      'fa-sort-up': sort === SortBy.BORN && !order,
                      'fa-sort-down': sort === SortBy.BORN && order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={toggleSort(SortBy.DIED)}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== SortBy.DIED,
                      'fa-sort-up': sort === SortBy.DIED && !order,
                      'fa-sort-down': sort === SortBy.DIED && order,
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
          <PersonTable key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
