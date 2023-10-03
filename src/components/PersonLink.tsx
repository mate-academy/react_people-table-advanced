import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type PersonLinkProps = {
  person: Person,
};

export const PersonLink: React.FC<PersonLinkProps> = (
  { person },
) => {
  const [searchParams] = useSearchParams();

  return (
    <td>
      <Link
        to={`/people/${person.slug}?${searchParams.toString()}`}
        state={{ personSlug: person.slug }}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {person.name}
      </Link>
    </td>
  );
};
