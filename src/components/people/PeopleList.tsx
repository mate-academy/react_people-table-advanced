import { FC } from 'react';
import { Person } from '../../types';
import { PersonInfo } from './';

interface Props {
  people: Person[];
}

export const PeopleList: FC<Props> = ({ people }) => {
  return (
    <tbody>
      {people.map(person => (
        <PersonInfo key={person.slug} person={person} />
      ))}
    </tbody>
  );
};
