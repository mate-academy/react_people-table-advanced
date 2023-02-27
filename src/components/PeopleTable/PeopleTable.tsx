import React from 'react';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';
import { SortLink } from '../SortLink';

interface Props {
  people: Person[];
  selectedPerson: string;
}

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  const sortingFields = ['Name', 'Sex', 'Born', 'Died'];

  const findParent = (name: string | null) => {
    return people.find((person) => person.name === name) || null;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortingFields.map(field =>
              <SortLink field={field} key={field} />
          )}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => {
          const mother = findParent(person.motherName);
          const father = findParent(person.fatherName);

          return (
            <PersonLink
              person={person}
              key={person.slug}
              selectedPerson={selectedPerson}
              mother={mother}
              father={father}
            />
          );
        })}
      </tbody>
    </table>
  );
};
