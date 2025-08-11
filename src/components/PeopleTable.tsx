import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const search = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || null;
  const sortOrder = searchParams.get('order') || null;

  const parentSlug = (name: string) => {
    return people.find(person => person.name === name)?.slug;
  };

  function sortedPeople(sortPeople: Person[]) {
    switch (sort) {
      case 'name':
      case 'sex':
        return sortPeople.sort((p1, p2) => p1[sort].localeCompare(p2[sort]));
      case 'born':
      case 'died':
        return sortPeople.sort((p1, p2) => p1[sort] - p2[sort]);
      default:
        return sortPeople;
    }
  }

  function filterPeople(): Person[] {
    let filteredPeople = [...people];

    filteredPeople = filteredPeople
      .filter(person => !sex || sex === 'all' || person.sex === sex)
      .filter(
        person =>
          !search || person.name.toLowerCase().includes(search.toLowerCase()),
      )
      .filter(
        person =>
          centuries.length === 0 ||
          centuries.includes(`${Math.floor((person.born - 1) / 100) + 1}`),
      );

    if (sort) {
      filteredPeople = sortedPeople(filteredPeople);
    }

    if (sortOrder) {
      filteredPeople.reverse();
    }

    return filteredPeople;
  }

  function linkForSort(sortValue: string) {
    let sortParams: { sort: string; order?: string } = { sort: sortValue };

    if (sort && sortOrder) {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.delete('sort');
      newSearchParams.delete('order');

      return {
        pathname,
        search: newSearchParams.toString(),
      };
    }

    if (sort === sortValue) {
      sortParams = { ...sortParams, order: 'desc' };
    }

    return {
      pathname,
      search: new URLSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        ...sortParams,
      }).toString(),
    };
  }

  const sortActiveClassNames = (sortValue: string) =>
    classNames('fas', {
      'fa-sort': sort !== sortValue,
      'fa-sort-up': sort === sortValue && !sortOrder,
      'fa-sort-down': sort === sortValue && sortOrder,
    });

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
              <Link to={linkForSort('name')}>
                <span className="icon">
                  <i className={sortActiveClassNames('name')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={linkForSort('sex')}>
                <span className="icon">
                  <i className={sortActiveClassNames('sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={linkForSort('born')}>
                <span className="icon">
                  <i className={sortActiveClassNames('born')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={linkForSort('died')}>
                <span className="icon">
                  <i className={sortActiveClassNames('died')} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filterPeople().map((person, index) => (
          <tr
            data-cy="person"
            key={index}
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <Link
                to={person.slug}
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
              {person.motherName ? (
                parentSlug(person.motherName) ? (
                  <Link
                    className={classNames({
                      'has-text-danger': parentSlug(person.motherName),
                    })}
                    to={`./${parentSlug(person.motherName)}`}
                  >
                    {person.motherName}
                  </Link>
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                parentSlug(person.fatherName) ? (
                  <Link to={`./${parentSlug(person.fatherName)}`}>
                    {person.fatherName}
                  </Link>
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
