import React from 'react';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  sort: string;
  order: string;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people, sort, order }) => {
  const { userFromId } = useParams();
  const [searchParams] = useSearchParams();

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
              <SearchLink
                params={{
                  sort: !order || sort !== 'name' ? 'name' : null,
                  order: sort === 'name' && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && !order,
                      'fa-sort-down': sort === 'name' && !!order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  sort: !order || sort !== 'sex' ? 'sex' : null,
                  order: sort === 'sex' && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && !order,
                      'fa-sort-down': sort === 'sex' && !!order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  sort: !order || sort !== 'born' ? 'born' : null,
                  order: sort === 'born' && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && !order,
                      'fa-sort-down': sort === 'born' && !!order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  sort: !order || sort !== 'died' ? 'died' : null,
                  order: sort === 'died' && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && !order,
                      'fa-sort-down': sort === 'died' && !!order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            name,
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,
          } = person;

          const isMotherName = motherName ? motherName : '-';
          const isFatherName = fatherName ? fatherName : '-';

          return (
            <tr
              data-cy="person"
              className={cn({ 'has-background-warning': userFromId === slug })}
              key={slug}
            >
              <td>
                <Link
                  className={cn({ 'has-text-danger': sex === 'f' })}
                  to={{
                    pathname: `../${slug}`,
                    search: searchParams.toString(),
                  }}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? (
                  <Link
                    className="has-text-danger"
                    to={{
                      pathname: `../${mother.slug}`,
                      search: searchParams.toString(),
                    }}
                  >
                    {motherName}
                  </Link>
                ) : (
                  isMotherName
                )}
              </td>

              <td>
                {father ? (
                  <Link
                    to={{
                      pathname: `../${father.slug}`,
                      search: searchParams.toString(),
                    }}
                  >
                    {fatherName}
                  </Link>
                ) : (
                  isFatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
