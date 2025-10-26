import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const className = person.sex === 'f' ? 'has-text-danger' : '';


  const location = useLocation();

  return (
    <Link to={`/people/${person.slug}${location.search}`} className={className}>
      {person.name}
    </Link>
  );
};
