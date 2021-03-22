import React from 'react';
import classNames from 'classnames';

import { PersonRow } from '../PersonRow';
import { THeader } from '../THeader';

import { People, Person } from '../../utils/type';
import { THeaders } from '../../utils/constants';
import './PeopleTable.scss';

export const PeopleTable: React.FC<People<Person, string>> = React.memo(({ people, personId }) => {
  return (
    <section className="section">
      <table className="table">
        <thead>
          <tr>
            <th>Number</th>
            {THeaders.map(header => (
              <th key={header}>
                <THeader header={header} />
              </th>
            ))}
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person: Person, index: number) => (
            <tr
              key={person.slug}
              className={classNames({ highlighted: personId === person.slug })}
            >
              <PersonRow
                person={person}
                index={index + 1}
                personId={personId}
                people={people}
              />
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </tfoot>
      </table>
    </section>
  );
});
