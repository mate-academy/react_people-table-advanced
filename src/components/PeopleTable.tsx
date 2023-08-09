import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SortBy } from '../types/SortBy';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { slug: slugParams } = useParams();

  const handleClick = (sort: SortBy) => {
    if (searchParams.get('sort') && !searchParams.get('order')) {
      return getSearchWith(searchParams, { order: 'desc' }).toString();
    }

    if (searchParams.get('sort') && searchParams.get('order')) {
      return getSearchWith(searchParams, { sort: null, order: null })
        .toString();
    }

    return getSearchWith(searchParams, { sort }).toString();
  };

  const correctClassNames = (sortBy: SortBy) => classNames(
    'fas',
    {
      'fa-sort':
        searchParams.get('sort') !== sortBy,
      'fa-sort-up':
        searchParams.get('sort') === sortBy && !searchParams.has('order'),
      'fa-sort-down':
        searchParams.get('sort') === sortBy && searchParams.has('order'),
    },
  );

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
              <Link
                to={{
                  search: handleClick(SortBy.NAME),
                }}
              >
                <span className="icon">
                  <i className={correctClassNames(SortBy.NAME)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: handleClick(SortBy.SEX),
                }}
              >
                <span className="icon">
                  <i className={correctClassNames(SortBy.SEX)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: handleClick(SortBy.BORN),
                }}
              >
                <span className="icon">
                  <i className={correctClassNames(SortBy.BORN)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search: handleClick(SortBy.DIED),
                }}
              >
                <span className="icon">
                  <i className={correctClassNames(SortBy.DIED)} />
                </span>
              </Link>
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

          return (
            <tr
              key={name}
              data-cy="person"
              className={classNames(
                {
                  'has-background-warning':
                    slugParams === person.slug,
                },
              )}
            >
              <td>
                <a
                  className={classNames(
                    { 'has-text-danger': sex === 'f' },
                  )}
                  href={`#/people/${slug}`}
                >
                  {name}
                </a>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {!motherName && (<td>-</td>)}

              {motherName && !mother && (
                <td>
                  {motherName}
                </td>
              )}

              {motherName && mother && (
                <td>
                  <a
                    className="has-text-danger"
                    href={`#/people/${mother.slug}`}
                  >
                    {motherName}
                  </a>
                </td>
              )}

              {!fatherName && (<td>-</td>)}

              {fatherName && !father && (
                <td>
                  {fatherName}
                </td>
              )}

              {fatherName && father && (
                <td>
                  <a
                    href={`#/people/${father.slug}`}
                  >
                    {fatherName}
                  </a>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
