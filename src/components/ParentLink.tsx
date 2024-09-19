import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  parentName: string | null;
  people: Person[];
}

export const ParentLink: React.FC<Props> = ({ parentName, people }) => {
  const parent = people.find(person => person.name === parentName);

  return (
    <td>
      {!parentName ? '-' : parent ? <PersonLink person={parent} /> : parentName}
    </td>
  );
};
