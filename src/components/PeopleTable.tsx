import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useMemo } from 'react';
import { PersonLink } from './Links';
import { Person } from '../types';
import { getSearchWith } from '../utils/getSearchWith';
import { SortType } from '../types/SortType';
import { getFiltered } from '../utils/getFiltered';

type Props = {
  people: Person[],
  error: boolean,
  searchParams: URLSearchParams,
  query: string,
  sexFilter: string,
  centuries: string[],
};

export const PeopleTable: React.FC<Props> = ({
  people,
  error,
  searchParams,
  query,
  sexFilter,
  centuries,
}) => {
  const { slug } = useParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const visiblePeople = useMemo(() => {
    return getFiltered(people, {
      query,
      sexFilter,
      centuries,
      sort,
      order,
    });
  }, [searchParams]);

  function sortBy(sortType: SortType) {
    const firstClick = sortType !== sort;
    const secondClick = sortType === sort && !order;

    if (firstClick) {
      return getSearchWith({ sort: sortType }, searchParams);
    }

    if (secondClick) {
      return getSearchWith({ order: 'desc' }, searchParams);
    }

    return getSearchWith({ sort: null, order: null }, searchParams);
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

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
              <Link
                to={{ search: sortBy(SortType.NAME) }}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== SortType.NAME,
                    'fa-sort-up': sort === SortType.NAME && !order,
                    'fa-sort-down': sort === SortType.NAME && order,
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
                to={{ search: sortBy(SortType.SEX) }}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== SortType.SEX,
                    'fa-sort-up': sort === SortType.SEX && !order,
                    'fa-sort-down': sort === SortType.SEX && order,
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
                to={{ search: sortBy(SortType.BORN) }}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== SortType.BORN,
                    'fa-sort-up': sort === SortType.BORN && !order,
                    'fa-sort-down': sort === SortType.BORN && order,
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
                to={{ search: sortBy(SortType.DIED) }}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== SortType.DIED,
                    'fa-sort-up': sort === SortType.DIED && !order,
                    'fa-sort-down': sort === SortType.DIED && order,
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
        {visiblePeople.length === 0
          ? (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )
          : (
            visiblePeople.map(person => (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames(null, {
                  'has-background-warning': person.slug === slug,
                })}
              >
                <PersonLink person={person} />
              </tr>
            ))
          )}
      </tbody>
    </table>
  );
};
