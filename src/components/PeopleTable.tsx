import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Prop {
  people: Person[];
}

export const PeopleTable: React.FC<Prop> = ({ people }) => {
  return (
    <tbody>
      {people.map(person => (
        <PersonLink person={person} key={person.name} />
      ))}
    </tbody>
  );
};
