import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface PersonLinkProps {
  name: string;
  people: Person[];
}

export const PersonLink: React.FC<PersonLinkProps> = ({ name, people }) => {
  const person = people.find(p => p.name === name);

  if (!person) {
    return <span>{name}</span>;
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
