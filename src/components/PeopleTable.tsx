import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SortBy } from '../types/SortBy';
import { SearchLink } from './SearchLink';

type Props = {
  peopleList: Person[],
  selectedPerson: string | null,
};

export const PeopleTable: React.FC<Props> = ({
  peopleList,
  selectedPerson,
}) => {
  const isSelected = (person: Person) => person.slug === selectedPerson;
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const sort = searchParams.get('sort') as SortBy || null;
  const order = searchParams.get('order');

  const getSlug = (name: string | null) => {
    const findPerson = peopleList.find(person => person.name === name);

    return findPerson?.slug;
  };

  const handleSortPeople = (sortBy: SortBy) => {
    return {
      sort: sort === sortBy && order ? null : sortBy,
      order: sort === sortBy && !order ? 'desc' : null,
    };
  };

  const handleSortClass = (sortBy: SortBy) => {
    return classNames(
      'fas',
      { 'fa-sort': sortBy !== sort },
      { 'fa-sort-up': sortBy === sort && !order },
      { 'fa-sort-down': sortBy === sort && order },
    );
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
              <SearchLink params={handleSortPeople(SortBy.NAME)}>
                <span className="icon">
                  <i className={handleSortClass(SortBy.NAME)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleSortPeople(SortBy.SEX)}>
                <span className="icon">
                  <i className={handleSortClass(SortBy.SEX)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleSortPeople(SortBy.BORN)}>
                <span className="icon">
                  <i className={handleSortClass(SortBy.BORN)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleSortPeople(SortBy.DIED)}>
                <span className="icon">
                  <i className={handleSortClass(SortBy.DIED)} />
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
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': isSelected(person),
            })}
          >
            <td>
              <Link
                to={`/people/${person.slug + location.search}`}
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
              {!person.motherName && <p>-</p>}

              {getSlug(person.motherName) ? (
                <Link
                  to={`/people/${getSlug(person.motherName)}`}
                  className="has-text-danger"
                >
                  {person.motherName}
                </Link>
              ) : (
                <p>{person.motherName}</p>
              )}
            </td>

            <td>
              {!person.fatherName && <p>-</p>}

              {getSlug(person.fatherName) ? (
                <Link
                  to={`/people/${getSlug(person.fatherName)}`}
                >
                  {person.fatherName}
                </Link>
              ) : (
                <p>{person.fatherName}</p>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
