import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  personName?: string | null;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ personName, people }) => {
  if (!personName) {
    return <>-</>;
  }

  const person = people.find(p => p.name === personName);

  if (!person) {
    return <>{personName}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
