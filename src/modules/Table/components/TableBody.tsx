import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../../types';
import { PersonRow } from './PersonRow';

type Props = {
  people: Person[];
};

export const TableBody: React.FC<Props> = ({ people }) => {
  let { activePerson } = useParams();

  if (!activePerson) {
    activePerson = '';
  }

  return (
    <tbody>
      {people.map((person: Person) => {
        return (
          <PersonRow
            key={person.slug}
            person={person}
            isActive={activePerson === person.slug}
          />
        );
      })}
    </tbody>
  );
};
