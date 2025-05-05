import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface PersonLinkProps {
  person?: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  if (!person || !person.slug) {
    return <span>-</span>;
  }

  const className = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link to={`/people/${person.slug}`} className={className}>
      {person.name}
    </Link>
  );
};
