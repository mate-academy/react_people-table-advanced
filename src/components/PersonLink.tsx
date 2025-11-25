import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person | null;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  if (!person) {
    return <span>-</span>;
  }

  const className = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: location.search,
      }}
      className={className}
    >
      {person.name}
    </Link>
  );
};
