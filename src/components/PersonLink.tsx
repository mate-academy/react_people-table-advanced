import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  person: Person | null;
  people: Person[];
  name?: string;
}

export const PersonLink = ({ person, name }: Props) => {
  if (!person) {
    return <span>{name || '-'}</span>;
  }

  const className = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link to={`/people/${person.slug}`} className={className}>
      {person.name}
    </Link>
  );
};
