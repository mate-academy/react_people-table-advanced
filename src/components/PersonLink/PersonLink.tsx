import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person | string;
}

export const PersonLink = ({ person }: Props) => {
  const [searchParams] = useSearchParams();

  return (
    <td>
      {typeof person === 'string' ? (
        <>{person}</>
      ) : (
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString(),
          }}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      )}
    </td>
  );
};
