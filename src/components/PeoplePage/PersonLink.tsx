import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type PersonLinkProps = {
  person: Person;
};

const PersonLink = ({ person }: PersonLinkProps) => {
  const location = useLocation();
  const search = location.search;

  return (
    <Link
      to={`/people/${person.slug}${search}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
