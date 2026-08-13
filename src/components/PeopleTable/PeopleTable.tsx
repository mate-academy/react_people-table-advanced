import React from 'react';
import { PersonLink } from './../PersonLink';
import { Person } from './../../types';

import { PeopleSort } from '../PeopleSort';

type Props = {
  people: Person[];
  selectedSlug: string | undefined;
  sortField: string | null;
  sortOrder: string | null;
};

export const sortTitles = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  sortField,
  sortOrder,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortTitles.map(sortTitle => {
            return (
              <PeopleSort
                key={sortTitle}
                sortTitle={sortTitle}
                sortField={sortField}
                sortOrder={sortOrder}
              />
            );
          })}

          {/* <th key={sortTitle}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {sortTitle}
                  <SearchLink params={{ sort: sortTitle.toLowerCase() }}>
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </SearchLink>
                </span>
          </th> */}

          {/* <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort-down" />
                </span>
              </a>
            </span>
          </th> */}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            people={people}
            selectedSlug={selectedSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
