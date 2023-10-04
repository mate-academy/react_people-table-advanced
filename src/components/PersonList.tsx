import React from 'react';
import { Person } from '../types';
import { Human } from './Human';

type Props = {
  people?: Person[];
};

export const PersonList: React.FC<Props> = ({
  people,
}) => {
  return (
    <>
      {people && people.map(person => (
        <Human
          key={person.slug}
          person={person}
        />
      ))}
    </>
  );
};
