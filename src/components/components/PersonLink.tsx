import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface PersonLinkProps {
  person: Person;
}

const PersonLink = ({ person }: PersonLinkProps) => {
  return (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
