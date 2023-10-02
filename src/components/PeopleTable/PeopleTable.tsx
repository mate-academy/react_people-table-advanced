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

  const TABLE_HEADERS_WITH_FILTERS = [
    'Name',
    'Sex',
    'Born',
    'Died',
  ];

  const TABLE_HEADERS_NO_FILTERS = [
    'Mother',
    'Father',
  ];

  const getSearchLink = (sortField: string) => {
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
          {TABLE_HEADERS_WITH_FILTERS.map(header => (
            <th key={header}>
              <span className="is-flex is-flex-wrap-nowrap">
                {header}
                <Link to={{
                  search: getSearchLink(header.toLowerCase()),
                }}
                >
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort': header.toLowerCase() !== sort,
                      'fa-sort-up': header.toLowerCase() === sort && !order,
                      'fa-sort-down': header.toLowerCase() === sort && order,
                    })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}

          {TABLE_HEADERS_NO_FILTERS.map(header => (
            <th key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === personSlug,
            })}
          >
            <td>
              <PersonLink
                person={person}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother
                ? (
                  <PersonLink
                    person={person.mother}
                  />
                )
                : (
                  person.motherName || EMPTY_FIELD
                )}
            </td>

            <td>
              {person.father
                ? (
                  <PersonLink
                    person={person.father}
                  />
                )
                : (
                  person.fatherName || EMPTY_FIELD
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
