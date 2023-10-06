import { useParams } from 'react-router-dom';
import { PeopleTableItem } from '../PeopleTableItem';
import { Person } from '../../types';

interface Props {
  people: Person[]
}

export const PeopleTableBody: React.FC<Props> = ({ people }) => {
  const { selectedPersonSlug = '' } = useParams();

  return (
    <tbody>
      {people.map(person => (
        <PeopleTableItem
          person={person}
          key={person.slug}
          selectedPersonSlug={selectedPersonSlug}
        />
      ))}
    </tbody>
  );
};
