/* eslint-disable jsx-a11y/control-has-associated-label */
// import { useSearchParams } from 'react-router-dom';
import React from 'react';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
// import { preparePeople } from '../utils/preparePeople';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  // const [searchParams] = useSearchParams();
  // const sex = searchParams.get('sex') || '';
  // const query = searchParams.get('query') || '';
  // const centuries = searchParams.getAll('centuries') || [];

  // const filteredPeople = preparePeople(people, sex, query, centuries);

  const allNamesOnServer = people.map(person => person.name);

  const getParentSlug = (choseName: string) => people
    .find(person => person.name === choseName)?.slug;

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
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
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
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            names={allNamesOnServer}
            getParentSlug={getParentSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
