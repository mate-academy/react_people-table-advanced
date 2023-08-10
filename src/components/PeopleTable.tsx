import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useMemo } from 'react';
import { PersonLink } from './Links';
import { Person } from '../types';
import { Params, getSearchWith } from '../utils/getSearchWith';
import { SortType } from '../types/SortType';

type Props = {
  people: Person[],
  error: boolean,
  searchParams: URLSearchParams,
  query: string,
  sexFilter: string,
  centuries: string[],
};

function getFiltered(
  people: Person[],
  {
    query,
    sexFilter,
    centuries,
    sort,
    order,
  }: Params,
) {
  let filteredPeople = [...people];

  if (sexFilter) {
    filteredPeople = filteredPeople.filter(person => {
      return person.sex === sexFilter;
    });
  }

  if (query && typeof query === 'string') {
    const correctQuery = query.trim().toLowerCase();

    filteredPeople = filteredPeople.filter(person => {
      return (
        person.name.toLowerCase().includes(correctQuery)
        || person.motherName?.toLowerCase().includes(correctQuery)
        || person.fatherName?.toLowerCase().includes(correctQuery)
      );
    });
  }

  if (centuries
    && Array.isArray(centuries)
    && centuries.length !== 0) {
    const correctCentury = centuries.map(century => +century);

    filteredPeople = filteredPeople.filter(person => {
      const bornCentury = Math.floor(person.born / 100) + 1;

      return correctCentury.includes(bornCentury);
    });
  }

  if (sort) {
    filteredPeople = filteredPeople.sort((person1, person2) => {
      switch (sort) {
        case SortType.NAME:
        case SortType.SEX:
          return person1[sort].localeCompare(person2[sort]);

        case SortType.BORN:
        case SortType.DIED:
          return person1[sort] - person2[sort];

        default:
          return 0;
      }
    });
  }

  if (order) {
    filteredPeople = filteredPeople.reverse();
  }

  return filteredPeople;
}

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
