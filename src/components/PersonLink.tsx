import { Link, useSearchParams } from 'react-router-dom';
import { PersonLinkProps } from '../types/props';

export const PersonLink = ({ person, name }: PersonLinkProps) => {
  const [searchParams] = useSearchParams();

  if (person) {
    switch (person.sex) {
      case 'm':
        return (
          <Link
            to={{
              pathname: `/people/${person?.slug}`,
              search: searchParams.toString(),
            }}
          >
            {person.name}
          </Link>
        );
      case 'f':
        return (
          <Link
            className="has-text-danger"
            to={{
              pathname: `/people/${person?.slug}`,
              search: searchParams.toString(),
            }}
          >
            {person.name}
          </Link>
        );
    }
  }

  if (name) {
    return <>{name}</>;
  }

  return <>-</>;
};
