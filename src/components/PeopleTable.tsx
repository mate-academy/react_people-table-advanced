import React from 'react';
import { Person } from '../types';
import { PersonRow } from './PersonRow';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type Props = { people: Person[] };

function getSortParams(
  currParams: URLSearchParams,
  field: string,
): SearchParams {
  return currParams.get('sort') === field
    ? currParams.get('order') === 'desc'
      ? { sort: null, order: null }
      : { order: 'desc' }
    : { sort: field, order: null };
}

function getArrowClass(currParams: URLSearchParams, field: string) {
  return `fas ${
    currParams.get('sort') === field
      ? currParams.get('order') === 'desc'
        ? 'fa-sort-up'
        : 'fa-sort-down'
      : 'fa-sort'
  }`;
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
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
              <SearchLink params={getSortParams(searchParams, 'name')}>
                <span className="icon">
                  <i className={getArrowClass(searchParams, 'name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams(searchParams, 'sex')}>
                <span className="icon">
                  <i className={getArrowClass(searchParams, 'sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams(searchParams, 'born')}>
                <span className="icon">
                  <i className={getArrowClass(searchParams, 'born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams(searchParams, 'died')}>
                <span className="icon">
                  <i className={getArrowClass(searchParams, 'died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
