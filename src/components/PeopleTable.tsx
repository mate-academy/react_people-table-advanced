import React from 'react';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Prop = {
  people: Person[];
};
export const PeopleTable: React.FC<Prop> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  enum SortType {
    Name = 'name',
    Sex = 'sex',
    Born = 'born',
    Died = 'died',
  }

  const arrowSortType = Object.entries(SortType);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {arrowSortType.map(([key, value]) => {
            let result = {};
            let arrow = '';

            if (sortField === value && sortOrder === 'desc') {
              result = { sort: null, order: null };
              arrow = 'arrowDown';
            } else if (sortField !== value) {
              result = { sort: value };
              arrow = 'defaultArrow';
            } else if (sortField === value && sortOrder !== 'desc') {
              result = { sort: value, order: 'desc' };
              arrow = 'arrowUp';
            }

            return (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <SearchLink params={result}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': arrow === 'defaultArrow',
                          'fa-sort-up': arrow === 'arrowUp',
                          'fa-sort-down': arrow === 'arrowDown',
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
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <Link
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: searchParams.toString(),
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
                {mother ? (
                  <Link
                    to={{
                      pathname: `/people/${mother.slug}`,
                      search: searchParams.toString(),
                    }}
                    className={classNames({
                      'has-text-danger': mother.sex === 'f',
                    })}
                  >
                    {person.motherName}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <Link
                    to={{
                      pathname: `/people/${father.slug}`,
                      search: searchParams.toString(),
                    }}
                  >
                    {person.fatherName}
                  </Link>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
