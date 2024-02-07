import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { personLink } = useParams();
  const currentPerson = people?.find(person => person.slug === personLink);
  const sortType = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const getSortParams = (field: string) => {
    if (field === sortType && !sortOrder) {
      return { sort: field, order: 'desc' };
    }

    if (field === sortType && sortOrder) {
      return { sort: null, order: null };
    }

    return { sort: field, order: null };
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
              <SearchLink
                params={getSortParams('name')}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortType !== 'name',
                    'fa-sort-up': sortType === 'name' && !sortOrder,
                    'fa-sort-down': sortType === 'name',
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
                params={getSortParams('sex')}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortType !== 'sex',
                    'fa-sort-up': sortType === 'sex' && !sortOrder,
                    'fa-sort-down': sortType === 'sex',
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
                params={getSortParams('born')}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortType !== 'born',
                    'fa-sort-up': sortType === 'born' && !sortOrder,
                    'fa-sort-down': sortType === 'born',
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
                params={getSortParams('died')}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortType !== 'died',
                    'fa-sort-up': sortType === 'died' && !sortOrder,
                    'fa-sort-down': sortType === 'died',
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
        {people?.map((person) => {
          const {
            name, sex, born, died, motherName, fatherName, slug,
          } = person;

          const father = people.find(
            dad => dad.name === fatherName,
          )?.slug || null;

          const mother = people.find(
            mom => mom.name === motherName,
          )?.slug || null;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === currentPerson?.slug,
              })}
            >
              <td>
                <Link
                  to={{
                    pathname: `../${slug}`,
                    search: searchParams.toString(),
                  }}
                  className={classNames({
                    'has-text-danger': sex === 'f',
                  })}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother && motherName ? (
                  <Link
                    to={{
                      pathname: `../${mother}`,
                      search: searchParams.toString(),
                    }}
                    className="has-text-danger"
                  >
                    {motherName}
                  </Link>
                ) : (<>{motherName || '-'}</>)}

              </td>
              <td>
                {father && fatherName ? (
                  <Link
                    to={{
                      pathname: `../${father}`,
                      search: searchParams.toString(),
                    }}
                  >
                    {fatherName}
                  </Link>
                ) : (<>{fatherName || '-'}</>)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
