import classNames from 'classnames';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person, SortFilter } from '../types';
import { useMemo } from 'react';
import { SearchLink } from './SearchLink';
import { getCentury } from '../utils/helpers';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const { search: searchLocation } = useLocation();

  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortBy = ['Name', 'Sex', 'Born', 'Died'];

  const filteredPeople = useMemo(() => {
    let filteringPeople = [...people];

    if (query) {
      const normalizedQuery = query.toLowerCase();

      filteringPeople = filteringPeople.filter(
        ({ name, motherName, fatherName }) =>
          name.toLowerCase().includes(normalizedQuery) ||
          motherName?.toLowerCase().includes(normalizedQuery) ||
          fatherName?.toLowerCase().includes(normalizedQuery),
      );
    }

    if (sex) {
      filteringPeople = filteringPeople.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      filteringPeople = filteringPeople.filter(person =>
        centuries.includes(getCentury(person.born)),
      );
    }

    return filteringPeople;
  }, [query, sex, centuries, people]);

  const sortedPeople = useMemo(() => {
    const sortingPeople = [...filteredPeople].sort(
      (firstPerson, secondPerson) => {
        switch (sort) {
          case SortFilter.Name:
          case SortFilter.Sex:
            return firstPerson[sort].localeCompare(secondPerson[sort]);
          case SortFilter.Born:
          case SortFilter.Died:
            return firstPerson[sort] - secondPerson[sort];
          default:
            return 0;
        }
      },
    );

    if (order === 'desc') {
      sortingPeople.reverse();
    }

    return sortingPeople;
  }, [order, filteredPeople, sort]);

  const handleDirectionChange = (sortName: string) => {
    if (sort !== sortName) {
      return { sort: sortName, order: 'asc' };
    } else {
      if (order === 'asc') {
        return { sort: sortName, order: 'desc' };
      } else if (order === 'desc') {
        return { sort: null, order: null };
      } else {
        return { sort: sortName, order: 'asc' };
      }
    }
  };

  return !sortedPeople.length ? (
    <p>There are no people matching the current search criteria</p>
  ) : (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortBy.map(option => {
            const normalizedOption = option.toLowerCase();

            return (
              <th key={option}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {option}
                  <SearchLink params={handleDirectionChange(normalizedOption)}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== normalizedOption,
                          'fa-sort-up':
                            sort === normalizedOption && order === 'asc',
                          'fa-sort-down':
                            sort === normalizedOption && order === 'desc',
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>

          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <Link
                to={{
                  pathname: `/people/${person.slug}`,
                  search: searchLocation,
                }}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <Link
                  to={{
                    pathname: `/people/${person.mother.slug}`,
                    search: searchLocation,
                  }}
                  className="has-text-danger"
                >
                  {person.motherName}
                </Link>
              ) : (
                person.motherName || '-'
              )}
            </td>

            <td>
              {person.father ? (
                <Link
                  to={{
                    pathname: `/people/${person.father.slug}`,
                    search: searchLocation,
                  }}
                >
                  {person.fatherName}
                </Link>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
