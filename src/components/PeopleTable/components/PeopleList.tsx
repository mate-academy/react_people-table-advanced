import React from 'react';
import { PersonItem } from './PersonItem';
import { Person } from '../../../types';

interface Props {
  list: Person[];
}

export const PeopleList: React.FC<Props> = ({ list }) => {
  return (
    <tbody>
      {list.map(person => (
        <PersonItem key={person.name} person={person} />
      ))}
    </tbody>
  );
};
