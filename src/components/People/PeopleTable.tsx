import React from 'react';
import { Person } from '../../types';
import { PersonItem } from './PersonItem';
import { PeopleTitle } from './PeopleTitle';

type Props = {
  visiblePeople: Person[],
  loading: boolean,
};

export const PeopleTable: React.FC<Props> = ({
  visiblePeople,
  loading,
}) => {
  const peopleTitles = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {peopleTitles.map((title) => (
            <PeopleTitle key={title} title={title} />
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {
          visiblePeople.length > 0
          && (visiblePeople.map(person => (
            <PersonItem
              key={person.slug}
              person={person}
              people={visiblePeople}
            />
          )))
        }

        {visiblePeople.length === 0 && !loading && (
          <tr data-cy="noPeopleMessage">
            <td>There are no people on the server</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
