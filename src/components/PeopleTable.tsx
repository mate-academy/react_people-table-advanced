import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  return (
    <table
      className="table is-striped is-hoverable is-fullwidth"
      data-cy="peopleTable"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
            data-cy="person"
          >
            <td data-cy="personName">
              <PersonLink personName={person.name} peoples={people} />
            </td>
            <td data-cy="personSex">{person.sex}</td>
            <td data-cy="personBorn">{person.born}</td>
            <td data-cy="personDied">{person.died}</td>
            <td data-cy="personMother">
              {person.motherName ? (
                <PersonLink personName={person.motherName} peoples={people} />
              ) : (
                '-'
              )}
            </td>
            <td data-cy="personFather">
              {person.fatherName ? (
                <PersonLink personName={person.fatherName} peoples={people} />
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
