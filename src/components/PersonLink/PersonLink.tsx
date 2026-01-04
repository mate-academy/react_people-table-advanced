import { Link, useSearchParams } from 'react-router-dom';
import type { PersonLinkProps } from '../../types/PersonLinkProps';

export const PersonLink = ({ person, personName }: PersonLinkProps) => {
  const [searchParams] = useSearchParams();

  if (person) {
    const isFemale = person.sex === 'f';

    const personLink = `/people/${person.slug}${
      searchParams.toString() ? `?${searchParams.toString()}` : ''
    }`;

    return (
      <Link
        to={personLink}
        className={isFemale ? 'has-text-danger' : 'has-text-info'}
      >
        {person.name}
      </Link>
    );
  }

  if (personName) {
    return <span>{personName}</span>;
  }

  return null;
};
