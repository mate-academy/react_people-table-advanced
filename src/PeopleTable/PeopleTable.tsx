import React from 'react';
import { Child } from '../types/human';

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

export const PeopleTable: React.FC<Props> = ({ people }) => {
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
          <tr key={person.name} className="Person">
            <th>{person.name}</th>
            <th>{person.sex}</th>
            <th>{person.born}</th>
            <th>{person.died}</th>
            <th>{person.mother?.name}</th>
            <th>{person.father?.name}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
