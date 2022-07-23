import React from 'react';
import { Child } from '../../types/human';
import { PersonRow } from '../PersonRow';

type Props = {
  people: Child[],
};

enum TableColumns {
  Name = 'Name',
  Sex = 'Sex',
  Born = 'Born',
  Died = 'Died',
  Mother = 'Mother',
  Father = 'Father',
}

export const PeopleTable: React.FC<Props> = React.memo(({ people }) => {
  return (
    <table className="PeopleTable table">
      <thead>
        <tr>
          <th>{TableColumns.Name}</th>
          <th>{TableColumns.Sex}</th>
          <th>{TableColumns.Born}</th>
          <th>{TableColumns.Died}</th>
          <th>{TableColumns.Mother}</th>
          <th>{TableColumns.Father}</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
});
