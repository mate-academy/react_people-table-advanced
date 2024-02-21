/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort');
  const orderType = searchParams.get('order');

  const sexFilter = searchParams.get('sex');
  const queryFilter = searchParams.get('query');
  const centuriesFilter = searchParams.getAll('centuries');

  const filteredPeople = people.filter(el => {
    let passesFilter = true;

    if (sexFilter && el.sex !== sexFilter) {
      passesFilter = false;
    }

    if (queryFilter) {
      const queryLowerCase = queryFilter.toLowerCase();
      const nameMatches = el.name.toLowerCase().includes(queryLowerCase);
      const motherNameMatches =
        el.motherName && el.motherName.toLowerCase().includes(queryLowerCase);
      const fatherNameMatches =
        el.fatherName && el.fatherName.toLowerCase().includes(queryLowerCase);

      if (!nameMatches && !motherNameMatches && !fatherNameMatches) {
        passesFilter = false;
      }
    }

    if (centuriesFilter.length > 0) {
      const birthCentury = Math.floor(el.born / 100) + 1;

      if (!centuriesFilter.includes(birthCentury.toString())) {
        passesFilter = false;
      }
    }

    return passesFilter;
  });

  const sortedPeople = filteredPeople.sort((a, b) => {
    if (sortBy === 'name' && orderType !== 'desc') {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === 'name' && orderType === 'desc') {
      return b.name.localeCompare(a.name);
    }

    // sex
    if (sortBy === 'sex' && orderType !== 'desc') {
      return a.sex.localeCompare(b.sex);
    }

    if (sortBy === 'sex' && orderType === 'desc') {
      return b.sex.localeCompare(a.sex);
    }

    // born
    if (sortBy === 'born' && orderType !== 'desc') {
      return a.born - b.born;
    }

    if (sortBy === 'born' && orderType === 'desc') {
      return b.born - a.born;
    }

    // died
    if (sortBy === 'died' && orderType !== 'desc') {
      return a.died - b.died;
    }

    if (sortBy === 'died' && orderType === 'desc') {
      return b.died - a.died;
    }

    return 0;
  });

  return (
    <>
      {sortedPeople.length === 0 && (
        <p>There are no people matching the current search criteria</p>
      )}
      {sortedPeople.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  {sortBy !== 'name' && (
                    <SearchLink params={{ sort: 'name' }}>
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </SearchLink>
                  )}
                  {sortBy === 'name' && orderType === 'desc' && (
                    <SearchLink params={{ sort: null, order: null }}>
                      <span className="icon">
                        <i className="fas fa-sort-down" />
                      </span>
                    </SearchLink>
                  )}
                  {sortBy === 'name' && orderType !== 'desc' && (
                    <SearchLink params={{ sort: 'name', order: 'desc' }}>
                      <span className="icon">
                        <i className="fas fa-sort-up" />
                      </span>
                    </SearchLink>
                  )}
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  {sortBy !== 'sex' && (
                    <SearchLink params={{ sort: 'sex' }}>
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </SearchLink>
                  )}
                  {sortBy === 'sex' && orderType === 'desc' && (
                    <SearchLink params={{ sort: null, order: null }}>
                      <span className="icon">
                        <i className="fas fa-sort-down" />
                      </span>
                    </SearchLink>
                  )}
                  {sortBy === 'sex' && orderType !== 'desc' && (
                    <SearchLink params={{ sort: 'sex', order: 'desc' }}>
                      <span className="icon">
                        <i className="fas fa-sort-up" />
                      </span>
                    </SearchLink>
                  )}
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  {sortBy !== 'born' && (
                    <SearchLink params={{ sort: 'born' }}>
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </SearchLink>
                  )}
                  {sortBy === 'born' && orderType === 'desc' && (
                    <SearchLink params={{ sort: null, order: null }}>
                      <span className="icon">
                        <i className="fas fa-sort-down" />
                      </span>
                    </SearchLink>
                  )}
                  {sortBy === 'born' && orderType !== 'desc' && (
                    <SearchLink params={{ sort: 'born', order: 'desc' }}>
                      <span className="icon">
                        <i className="fas fa-sort-up" />
                      </span>
                    </SearchLink>
                  )}
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  {sortBy !== 'died' && (
                    <SearchLink params={{ sort: 'died' }}>
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </SearchLink>
                  )}
                  {sortBy === 'died' && orderType === 'desc' && (
                    <SearchLink params={{ sort: null, order: null }}>
                      <span className="icon">
                        <i className="fas fa-sort-down" />
                      </span>
                    </SearchLink>
                  )}
                  {sortBy === 'died' && orderType !== 'desc' && (
                    <SearchLink params={{ sort: 'died', order: 'desc' }}>
                      <span className="icon">
                        <i className="fas fa-sort-up" />
                      </span>
                    </SearchLink>
                  )}
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {sortedPeople.map(person => {
              const mother = people.find(el => el.name === person.motherName);
              const father = people.find(el => el.name === person.fatherName);

              return (
                <tr
                  className={cn({
                    'has-background-warning': person.slug === slug,
                  })}
                  data-cy="person"
                  key={person.slug}
                >
                  <td>
                    <Link
                      className={cn({
                        'has-text-danger': person.sex === 'f',
                      })}
                      to={{
                        pathname: `/people/${person.slug}`,
                        search: searchParams.toString(),
                      }}
                    >
                      {person.name}
                    </Link>
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  {mother ? (
                    <td>
                      <Link
                        className={cn({
                          'has-text-danger': mother.sex === 'f',
                        })}
                        to={{
                          pathname: `/people/${mother.slug}`,
                          search: searchParams.toString(),
                        }}
                      >
                        {mother.name}
                      </Link>
                    </td>
                  ) : (
                    <td>{person.motherName ? person.motherName : '-'}</td>
                  )}
                  {father ? (
                    <td>
                      <Link
                        className={cn({
                          'has-text-danger': father.sex === 'f',
                        })}
                        to={{
                          pathname: `/people/${father.slug}`,
                          search: searchParams.toString(),
                        }}
                      >
                        {father.name}
                      </Link>
                    </td>
                  ) : (
                    <td>{person.fatherName ? person.fatherName : '-'}</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
