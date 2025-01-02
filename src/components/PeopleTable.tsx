import React from 'react';
import { PersonField, Person } from '../types';
import { PeopleLink } from './PeopleLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <div className="block">
      <div className="box table-container">
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {Object.values(PersonField).map(field => (
                <th key={field}>{field}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {people.map(person => (
              <PeopleLink key={person.slug} person={person} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
