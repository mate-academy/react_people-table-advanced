import React from 'react';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cl from 'classnames';
import { SearchLink } from './SearchLink';
/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [search] = useSearchParams();

  const findPerson = (name: string) =>
    people.find(person => person.name === name);

  const getRelative = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const person = findPerson(name);

    if (!person) {
      return name;
    }

    return (
      <Link
        to={person.slug}
        className={cl({ 'has-text-danger': person.sex === 'f' })}
      >
        {person.name}
      </Link>
    );
  };

  const sortBy = (sort: string) => {
    const sortParam = search.get('sort');
    const orderParam = search.get('order');

    if (sortParam === sort && orderParam) {
      return {
        sort: null,
        order: null,
      };
    }

    if (sortParam === sort) {
      return { sort, order: 'desc' };
    }

    return { sort, order: null };
  };

  const getSortIconClass = (column: string) => {
    const sortParam = search.get('sort');
    const orderParam = search.get('order');

    return cl(
      'fas',
      { 'fa-sort': sortParam !== column },
      {
        'fa-sort-up': sortParam === column && orderParam === null,
      },
      {
        'fa-sort-down': sortParam === column && orderParam === 'desc',
      },
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
              <SearchLink params={sortBy('name')}>
                <span className="icon">
                  <i className={getSortIconClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={sortBy('sex')}>
                <span className="icon">
                  <i className={getSortIconClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={sortBy('born')}>
                <span className="icon">
                  <i className={getSortIconClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={sortBy('died')}>
                <span className="icon">
                  <i className={getSortIconClass('died')} />
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
          <tr
            data-cy="person"
            key={person.slug}
            className={cl({ 'has-background-warning': person.slug === slug })}
          >
            <td>
              <Link
                to={{
                  pathname: person.slug,
                  search: search.toString(),
                }}
                className={cl({ 'has-text-danger': person.sex === 'f' })}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getRelative(person.motherName)}</td>
            <td>{getRelative(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
