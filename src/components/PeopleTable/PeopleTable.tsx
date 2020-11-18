import React from 'react';

import { IPerson } from '../../Interfaces/Interfaces';
import PersonRow from './PersonRow';

const PeopleTable: React.FC<{ people: IPerson[] }> = ({ people }) => {
  return (
    <div>
      <table className="peopleTable">
        <thead>
          <tr>
            <td>Name</td>
            <td>Sex</td>
            <td>Born</td>
            <td>Died</td>
            <td>Mother</td>
            <td>Father</td>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <PersonRow person={person} people={people} key={person.name} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleTable;
