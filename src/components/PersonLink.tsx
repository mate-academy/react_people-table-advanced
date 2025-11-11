import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

export const PersonLink = ({
  name,
  person,
}: {
  name: string | null;
  person?: Person;
}) => {
  const location = useLocation();

  if (!name) {
    return <span>-</span>;
  }

  const isFemale = (name && name === person?.motherName) || person?.sex === 'f';
  const className = isFemale ? 'has-text-danger' : '';

  if (person && person.slug) {
    return (
      <Link
        to={{
          pathname: `/people/${person.slug}`,
          search: location.search,
        }}
        className={className}
      >
        {name}
      </Link>
    );
  }

  return <span className={className}>{name}</span>;
};
