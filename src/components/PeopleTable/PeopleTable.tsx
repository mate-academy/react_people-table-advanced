import React from 'react';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem';
import { useParams } from 'react-router-dom';

interface Props {
  peopleList: Person[];
}

export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  const { slug } = useParams();

  return (
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
          {peopleList.map(person => (
            <PersonItem
              key={person.slug}
              person={person}
              isActive={slug === person.slug}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
