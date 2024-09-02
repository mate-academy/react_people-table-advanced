import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { SortBy } from '../types/enumSortBy';
import { getSearchWith } from '../utils/searchHelper';
import { getSortParams } from '../utils/getSortParams';

type Props = {
  filteredPeople: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ filteredPeople }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') as SortBy;
  const order = searchParams.get('order');

  const personHasLink = (name: string | null) => {
    if (name) {
      return filteredPeople.map(person => person.name).includes(name);
    }

    return;
  };

  const getPersonSlug = (name: string | null) => {
    if (name) {
      return filteredPeople.find(person => person.name === name)?.slug;
    }

    return;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortBy).map(([key, value]) => (
            <th key={key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <Link
                  to={{
                    search: getSearchWith(
                      searchParams,
                      getSortParams(value, sortBy, order),
                    ),
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sortBy !== value,
                        'fa-sort-up': sortBy === value && !order,
                        'fa-sort-down': !!order,
                      })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}

          <th>Mother</th>

          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === personSlug,
            })}
          >
            <td>
              <Link
                to={{
                  pathname: `${person.slug}`,
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
              {personHasLink(person.motherName) ? (
                <Link
                  to={{
                    pathname: `${getPersonSlug(person.motherName)}`,
                    search: searchParams.toString(),
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
              {personHasLink(person.fatherName) ? (
                <Link
                  to={{
                    pathname: `${getPersonSlug(person.fatherName)}`,
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
        ))}
      </tbody>
    </table>
  );
};
