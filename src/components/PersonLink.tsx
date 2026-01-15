import { Link } from 'react-router-dom';
import { Person } from '../types';
import { useLocation } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={`/people/${person.slug}${search}`}
    >
      {person.name}
    </Link>
  );
};
