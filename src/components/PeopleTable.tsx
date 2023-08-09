/* eslint-disable no-nested-ternary */
import {
  Link,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { useMemo } from 'react';
import { PersonLink } from './Links';
import { Person } from '../types';
import { Params, Sort, getSearchWith } from '../utils/getSearchWith';

type Props = {
  people: Person[],
  error: boolean,
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
        case Sort.NAME:
        case Sort.SEX:
          return person1[sort].localeCompare(person2[sort]);

        case Sort.BORN:
        case Sort.DIED:
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
}) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sexFilter = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
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

  function sortBy(sortType: Sort) {
    const firstClick = sortType !== sort;
    const secondClick = sortType === sort && !order;

    if (firstClick) {
      return getSearchWith({ sort: sortType }, searchParams);
    }

    if (secondClick) {
      return getSearchWith({ sort: null, order: 'desc' }, searchParams);
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
                to={{ search: sortBy(Sort.NAME) }}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== Sort.NAME,
                    'fa-sort-up': sort === Sort.NAME && !order,
                    'fa-sort-down': sort === Sort.NAME && order,
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
                to={{ search: sortBy(Sort.SEX) }}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== Sort.SEX,
                    'fa-sort-up': sort === Sort.SEX && !order,
                    'fa-sort-down': sort === Sort.SEX && order,
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
                to={{ search: sortBy(Sort.BORN) }}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== Sort.BORN,
                    'fa-sort-up': sort === Sort.BORN && !order,
                    'fa-sort-down': sort === Sort.BORN && order,
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
                to={{ search: sortBy(Sort.DIED) }}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== Sort.DIED,
                    'fa-sort-up': sort === Sort.DIED && !order,
                    'fa-sort-down': sort === Sort.DIED && order,
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
