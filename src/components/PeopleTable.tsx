import React from 'react';

import Person from '../types/Person';
import { PersonTableItem } from './PersonTableItem';
import { SortLink } from './SortLink';
import { SortField } from '../types/Sort';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <SortLink sortField={SortField.FullName} />
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <SortLink sortField={SortField.Gender} />
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <SortLink sortField={SortField.BornYear} />
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <SortLink sortField={SortField.DiedYear} />
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {people.map(person => (
            <PersonTableItem person={person} key={person.slug} />
          ))}
        </tbody>
      </table>
      {people.length === 0 && (
        <div className="notification is-warning">No people found.</div>
      )}
    </>
  );
};
