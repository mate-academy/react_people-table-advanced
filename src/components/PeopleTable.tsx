import classNames from 'classnames';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import React, { useMemo, useState } from 'react';
import { Person } from '../types';
import { PersonLink } from './PesonLink';
import { getSearchWith } from '../utils/searchHelper';
import { SortParams } from '../types/SortParams';

type Props = {
  people: Person[],
  filteredPeople: Person[],
};

export const PeopleTable: React.FC<Props> = ({
  people, filteredPeople,
}) => {
  const [
    sortedFilteredPeople, setSortedFilteredPeople,
  ] = useState<Person[]>(filteredPeople);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const sortParam = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handlerSortPeopleBy = (sortParams: SortParams) => {
    return [...filteredPeople].sort((personA, personB) => {
      if (typeof personA[sortParams] === 'string') {
        const valueA = personA[sortParams].toString();
        const valueB = personB[sortParams].toString();

        return valueA.localeCompare(valueB);
      }

      const valueA = +personA[sortParams];
      const valueB = +personB[sortParams];

      return valueA - valueB;
    });
  };

  const getSortedPeople = () => {
    let sortedPeople = filteredPeople;

    if (sortParam) {
      switch (sortParam) {
        case SortParams.Name:
          sortedPeople = handlerSortPeopleBy(SortParams.Name);
          break;

        case SortParams.Sex:
          sortedPeople = handlerSortPeopleBy(SortParams.Sex);
          break;

        case SortParams.Born:
          sortedPeople = handlerSortPeopleBy(SortParams.Born);
          break;

        case SortParams.Died:
          sortedPeople = handlerSortPeopleBy(SortParams.Died);
          break;

        default:
          sortedPeople = filteredPeople;
      }

      return order ? sortedPeople.reverse() : sortedPeople;
    }

    return sortedPeople;
  };

  const getSearchSortBy = (key: string) => {
    if (sortParam !== key) {
      return getSearchWith(searchParams, { sort: key, order: null });
    }

    return (!order)
      ? getSearchWith(searchParams, { order: 'desc' })
      : getSearchWith(searchParams, { sort: null, order: null });
  };

  useMemo(() => {
    setSortedFilteredPeople(getSortedPeople());
  }, [searchParams, filteredPeople]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-no-wrap">
              Name
              <Link
                to={{
                  pathname: location.pathname,
                  search: getSearchSortBy('name'),
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': sortParam !== SortParams.Name },
                    { 'fa-sort-up': sortParam === SortParams.Name && !order },
                    { 'fa-sort-down': sortParam === SortParams.Name && order },
                  )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-no-wrap">
              Sex
              <Link
                to={{
                  pathname: location.pathname,
                  search: getSearchSortBy('sex'),
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': sortParam !== SortParams.Sex },
                    { 'fa-sort-up': sortParam === SortParams.Sex && !order },
                    { 'fa-sort-down': sortParam === SortParams.Sex && order },
                  )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-no-wrap">
              Born
              <Link
                to={{
                  pathname: location.pathname,
                  search: getSearchSortBy('born'),
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': sortParam !== SortParams.Born },
                    { 'fa-sort-up': sortParam === SortParams.Born && !order },
                    { 'fa-sort-down': sortParam === SortParams.Born && order },
                  )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-no-wrap">
              Died
              <Link
                to={{
                  pathname: location.pathname,
                  search: getSearchSortBy('died'),
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': sortParam !== SortParams.Died },
                    { 'fa-sort-up': sortParam === SortParams.Died && !order },
                    { 'fa-sort-down': sortParam === SortParams.Died && order },
                  )}
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
        {sortedFilteredPeople.map(person => (
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
