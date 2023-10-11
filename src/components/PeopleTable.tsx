import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { SortField } from '../types/SortFields';
import { PersonCard } from './PersonCard';
import { SortLink } from './Sort';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SortField.map((sort) => (
            <th key={sort}>
              {sort}
              <SortLink sortBy={sort} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map((person) => (
          <PersonCard
            person={person}
            key={person.slug}
            personSlug={personSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
