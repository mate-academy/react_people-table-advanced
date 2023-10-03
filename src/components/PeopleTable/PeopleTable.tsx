import React from 'react';

import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';
import { EMPTY_FIELD } from '../../utils/constants';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const TABLE_HEADERS_WITH_SORT = [
    'Name',
    'Sex',
    'Born',
    'Died',
  ];

  const TABLE_HEADERS_NO_SORT = [
    'Mother',
    'Father',
  ];

  const getSortSearchLink = (sortField: string) => {
    const searchUpdates: { sort: string | null, order: null | string } = {
      sort: sortField,
      order: null,
    };

    if (sort === sortField && !order) {
      searchUpdates.order = 'desc';
    }

    if (sort === sortField && order) {
      searchUpdates.sort = null;
    }

    return getSearchWith(searchParams, searchUpdates);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_HEADERS_WITH_SORT.map(header => {
            const normalisedHeader = header.toLowerCase();

            return (
              <th key={header}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {header}
                  <Link to={{
                    search: getSortSearchLink(normalisedHeader),
                  }}
                  >
                    <span className="icon">
                      <i className={classNames('fas', {
                        'fa-sort': normalisedHeader !== sort,
                        'fa-sort-up': normalisedHeader === sort && !order,
                        'fa-sort-down': normalisedHeader === sort && order,
                      })}
                      />
                    </span>
                  </Link>
                </span>
              </th>
            );
          })}

          {TABLE_HEADERS_NO_SORT.map(header => (
            <th key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            slug,
            sex,
            born,
            died,
            motherName,
            mother,
            fatherName,
            father,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === personSlug,
              })}
            >
              <td>
                <PersonLink
                  person={person}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother
                  ? (
                    <PersonLink
                      person={mother}
                    />
                  )
                  : (
                    motherName || EMPTY_FIELD
                  )}
              </td>

              <td>
                {father
                  ? (
                    <PersonLink
                      person={father}
                    />
                  )
                  : (
                    fatherName || EMPTY_FIELD
                  )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
