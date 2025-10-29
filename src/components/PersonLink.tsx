import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  className?: string;
};

export const PersonLink: React.FC<Props> = ({ person, className }) => {
  const isFemale = person.sex === 'f';

  return (
    <Link
      to={`/people/${person.slug}`}
      className={(className || '') + (isFemale ? ' has-text-danger' : '')}
    >
      {person.name}
    </Link>
  );
};
