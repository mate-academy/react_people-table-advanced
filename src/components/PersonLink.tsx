import { Link } from 'react-router-dom';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person | null;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  return person ? (
    <Link
      to={`../${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  ) : (
    <span>-</span>
  );
};
