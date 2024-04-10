import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

interface Props {
  preparePeopleList: Person[];
  toggleByParams: (param: string) => SearchParams;
  getClassParams: (
    param: string,
  ) => 'fas fa-sort-up' | 'fas fa-sort-down' | 'fas fa-sort';
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({
  preparePeopleList,
  toggleByParams,
  getClassParams,
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
              <SearchLink params={toggleByParams('name')}>
                <span className="icon">
                  <i className={getClassParams('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={toggleByParams('sex')}>
                <span className="icon">
                  <i className={getClassParams('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={toggleByParams('born')}>
                <span className="icon">
                  <i className={getClassParams('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={toggleByParams('died')}>
                <span className="icon">
                  <i className={getClassParams('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparePeopleList.map(person => (
          <PersonLink
            people={preparePeopleList}
            person={person}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
