import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person?: Person;
  name?: string | null;
  className?: string;
};

export const PersonLink: React.FC<Props> = ({ person, name, className }) => {
  const [searchParams] = useSearchParams();

  if (person) {
    return (
      <Link
        to={{
          pathname: `/people/${person.slug}`,
          search: searchParams.toString(),
        }}
        className={className}
      >
        {person.name}
      </Link>
    );
  }

  return <>{name || '-'}</>;
};
