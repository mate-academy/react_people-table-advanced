import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  className?: string;
};

export const PersonLink: React.FC<Props> = ({ person, className }) => {
  const isFemale = person.sex === 'f';
  const location = useLocation();

  return (
    <Link
      to={{ pathname: `/people/${person.slug}`, search: location.search }}
      className={(className || '') + (isFemale ? ' has-text-danger' : '')}
    >
      {person.name}
    </Link>
  );
};
