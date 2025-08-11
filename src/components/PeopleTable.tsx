/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Person } from '../types/Person';
import PersonLink from './PersonLink';
import SortHeader from './SortHeader';
import './SortHeader.scss';

interface Props {
  people: Person[];
}

const PeopleTable: React.FC<Props> = ({ people }) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <SortHeader field="name" label="Name" />
          <SortHeader field="sex" label="Sex" />
          <SortHeader field="born" label="Born" />
          <SortHeader field="died" label="Died" />
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              selectedSlug === person.slug ? 'has-background-warning' : ''
            }
            onClick={() => setSelectedSlug(person.slug)}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
