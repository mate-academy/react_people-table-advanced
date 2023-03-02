import React from 'react';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';
import { SortLink } from '../SortLink';
import { SortType } from '../../types/SortType';

interface Props {
  people: Person[];
  selectedPerson: string;
}

export const PeopleTable: React.FC<Props> = React.memo(({
  people,
  selectedPerson,
}) => {
  // const sortingFields = ['Name', 'Sex', 'Born', 'Died'];

  if (!people.length) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortType).map((field: SortType) => (
            <SortLink field={field} key={field} />
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => (
          <PersonLink
            person={person}
            key={person.slug}
            selectedPerson={selectedPerson}
          />
        ))}
      </tbody>
    </table>
  );
});
