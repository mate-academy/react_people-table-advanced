import React from 'react';
import { Person } from '../types/Person';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
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
          <tr key={person.slug} data-cy="person">
            <td>{person.name}</td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{typeof person.mother === 'string' ? person.mother : '-'}</td>
            <td>{typeof person.father === 'string' ? person.father : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
