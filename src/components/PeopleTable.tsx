import React from 'react';
import { PersonLink } from './PersonLink';

interface Person {
  slug: string;
  name: string;
  sex: string;
  born: number;
  died: number;
  motherName: string | null;
  fatherName: string | null;
  isSelected?: boolean;
}

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => (
  <div className="block">
    <div className="box table-container">
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
            <tr
              key={person.slug}
              className={person.isSelected ? 'has-background-warning' : ''}
              data-cy="person"
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{person.motherName || '-'}</td>
              <td>{person.fatherName || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
