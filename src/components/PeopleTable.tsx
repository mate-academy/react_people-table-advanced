/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from './getSearchWith';

interface Props {
  people: Person[]
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const arrowHandler = (sorting: string) => {
    if (order === null) {
      return (sort === null || sort !== sorting ? (
        <Link
          to={{ search: getSearchWith({ sort: sorting }, searchParams) }}
        >
          <span className="icon">
            <i className="fas fa-sort" />
          </span>
        </Link>
      ) : (
        <Link
          to={{
            search: getSearchWith({
              order: 'desc',
            }, searchParams),
          }}
        >
          <span className="icon">
            <i className="fas fa-sort-up" />
          </span>
        </Link>
      ));
    }

    if (order !== null && sort !== sorting) {
      return (
        <Link
          to={{
            search: getSearchWith({
              sort: sorting,
              order: null,
            }, searchParams),
          }}
        >
          <span className="icon">
            <i className="fas fa-sort" />
          </span>
        </Link>
      );
    }

    return (
      <Link
        to={{
          search: getSearchWith({
            order: null,
            sort: null,
          }, searchParams),
        }}
      >
        <span className="icon">
          <i className="fas fa-sort-down" />
        </span>
      </Link>
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
              {arrowHandler('name')}

            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              {arrowHandler('sex')}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              {arrowHandler('born')}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              {arrowHandler('died')}
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink key={person.slug} person={person} people={people} />
        ))}
      </tbody>
    </table>
  );
};
