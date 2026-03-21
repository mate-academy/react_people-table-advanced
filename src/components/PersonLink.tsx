import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person | undefined;
}

export const PersonLink = ({ person }: Props) => {
  const [searchParams] = useSearchParams();

  return (
    <>
      <Link
        to={{
          pathname: `/people/${person?.slug}`,
          search: searchParams.toString(),
        }}
        className={person?.sex === 'f' ? 'has-text-danger' : undefined}
      >
        {person?.name}
      </Link>
    </>
  );
};
