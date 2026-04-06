import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  name?: string;
};

export const PersonLink = ({ person, name }: Props) => {
  const { search } = useLocation();

  return (
    <Link
      to={`/people/${person.slug}${search}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {name || person.name}
    </Link>
  );
};
