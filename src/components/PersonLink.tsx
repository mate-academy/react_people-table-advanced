import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person?: Person;
  name?: string;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  const location = useLocation();

  if (!person) {
    return <>{name}</>;
  }

  const slug = `${person.name.toLowerCase().replace(/\s+/g, '-')}-${person.born}`;
  const isFemale = person.sex === 'f';

  return (
    <Link
      to={`/people/${slug}${location.search}`}
      className={isFemale ? 'has-text-danger' : ''}
      data-cy="personLink"
    >
      {person.name}
    </Link>
  );
};
