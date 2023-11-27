import { Person } from '../types';
import { PersonItem } from './PersonItem';

type Props = {
  people: Person[]
};

export const PeopleList = ({ people }: Props) => {
  return (
    <tbody>
      {people.map(person => {
        return (
          <PersonItem
            key={person.slug}
            person={person}
          />
        );
      })}
    </tbody>
  );
};
