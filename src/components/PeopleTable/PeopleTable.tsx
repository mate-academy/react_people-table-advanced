import { useParams } from 'react-router-dom';
import React from 'react';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { selectedPersonSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
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
          <PersonItem
            key={person.slug}
            person={person}
            isSelected={person.slug === selectedPersonSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
