import { Person } from '../../../types';
import { PeopleItem } from '../PeopleItem/PeopleItem';

type Props = {
  people: Person[];
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  return (
    <tbody>
      {people.map(person => (
        <PeopleItem key={person.slug} person={person} />
      ))}
    </tbody>
  );
};
