import React from 'react';
import { PeopleSort } from '../PeopleSort/PeopleSort';
import { Person } from '../../types';
import { BodyTable } from '../BodyTable';

type Props = {
  people: Person[],
  selectedSlug: string | undefined,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <PeopleSort />
      </thead>

      <tbody>
        {people.map(person => (
          <BodyTable
            person={person}
            selectedSlug={selectedSlug}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
