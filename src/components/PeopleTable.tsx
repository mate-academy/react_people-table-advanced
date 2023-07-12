import React from 'react';
import { useParams } from 'react-router-dom';

import { Person } from '../types';
import { PersonInfo } from './PersonInfo';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug = '' } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(column => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column}
                <a href="#/people?sort=name">
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </a>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonInfo
            key={person.slug}
            person={person}
            selectedPersonSlug={slug}
          />
        ))}
      </tbody>
    </table>
  );
};
