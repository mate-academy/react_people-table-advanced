import React, { FC } from 'react';
import { PersonFull } from '../../services/types';
import { PeopleTableHeaders } from './PeopleTableHeaders';
import { PeopleTableRow } from './PeopleTableRow/PeopleTableRow';

interface Props {
  people: PersonFull[];
}

export const PeopleTable: FC<Props> = React.memo(({ people }) => {
  return (
    <table className="table people-table">
      <PeopleTableHeaders />

      <tbody>
        {people.map(person => (
          <PeopleTableRow
            person={person}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
});
