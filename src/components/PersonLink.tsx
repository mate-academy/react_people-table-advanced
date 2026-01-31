import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person?: Person | null;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  if (!person || !person.name) {
    return '-';
  }

  const className = person.sex === 'f' ? 'has-text-danger' : '';

  {
    if (person.slug) {
      return (
        <Link
          to={{
            pathname: person.slug ? `/people/${person.slug}` : '/people',
            search: searchParams.toString(),
          }}
          className={className}
        >
          {person.name}
        </Link>
      );
    }

    return <span className={className}>{person.name}</span>;
  }
};
