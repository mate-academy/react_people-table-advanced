import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const className = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link className={className} to={`/people/${person.slug}`}>
      {person.name}
    </Link>
  );
};
