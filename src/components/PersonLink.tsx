import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const location = useLocation();
  const className = person.sex === 'f' ? 'has-text-danger' : '';

  if (!person.slug) {
    return <span className={className}>{person.name}</span>;
  }

  return (
    <Link className={className} to={`/people/${person.slug}${location.search}`}>
      {person.name}
    </Link>
  );
};
