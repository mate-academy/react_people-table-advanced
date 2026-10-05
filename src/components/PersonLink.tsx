import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person | undefined;
  name: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  const [searchParams] = useSearchParams();

  if (!name) {
    return <>-</>;
  }

  if (!person) {
    return <>{name}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}${searchParams ? `?${searchParams}` : ''}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
