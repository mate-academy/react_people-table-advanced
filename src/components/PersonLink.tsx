import cn from 'classnames';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';

interface Props {
  person: Person | string | null;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  if (!person) {
    return <>-</>;
  }

  if (typeof person === 'string') {
    return <>{person}</>;
  }

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
