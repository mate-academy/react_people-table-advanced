import React from 'react';
import { Person } from '../../types';
import { PersonComponent } from '../PersonComponent';
import { SortComponent } from '../SortComponent';

interface Props {
  people: Person[]
}

export const PeopleComponent: React.FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <SortComponent />

      <tbody>
        {people.map((person) => (
          <PersonComponent person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
