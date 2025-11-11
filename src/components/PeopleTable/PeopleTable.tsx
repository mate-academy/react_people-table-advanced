import React from 'react';
import { Person } from '../../types';
import { PersonRaw } from '../PersonRaw/PersonRaw';
import { Link } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SortingArrow } from './SortingArrow';

interface PoepleTableProps {
  people: Person[];
  searchParams: URLSearchParams;
  getSortLinkProps: (field: string) => {};
  sort: string | null;
  order: string | null;
}

export const PeopleTable: React.FC<PoepleTableProps> = ({
  people,
  searchParams,
  getSortLinkProps,
  sort,
  order,
}) => {
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
                  search: getSearchWith(searchParams, {
                    ...getSortLinkProps('name'),
                  }),
                }}
                replace
              >
                <SortingArrow sort={sort} order={order} field={'name'} />
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    ...getSortLinkProps('sex'),
                  }),
                }}
                replace
              >
                <SortingArrow sort={sort} order={order} field={'sex'} />
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    ...getSortLinkProps('born'),
                  }),
                }}
                replace
              >
                <SortingArrow sort={sort} order={order} field={'born'} />
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    ...getSortLinkProps('died'),
                  }),
                }}
                replace
              >
                <SortingArrow sort={sort} order={order} field={'died'} />
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonRaw key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
