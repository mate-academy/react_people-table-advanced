import { useParams } from 'react-router-dom';
import React from 'react';
import { Person } from '../types';
import { User } from './User';
import { NamesColumnsTable } from '../constants/NamesColumnsTable';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug = '' } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {NamesColumnsTable.map(name => (
            <th
              key={name}
            >
              {name}
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map((person) => {
          return (
            <User
              key={person.slug}
              person={person}
              selectedUser={slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
