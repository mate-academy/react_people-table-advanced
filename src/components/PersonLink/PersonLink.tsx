import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();
  const search = location.search;

  return (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={`/people/${person.slug}${search}`}
    >
      {person.name}
    </Link>
  );
};
