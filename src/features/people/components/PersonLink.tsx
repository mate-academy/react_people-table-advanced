import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../../types';
import cn from 'classnames';

interface Props {
  name: string | null;
  people: Person[];
}

export const PersonLink = ({ name, people }: Props) => {
  const person = people.find(p => p.name === name);

  const [searchParams] = useSearchParams();
  const search = searchParams.toString();

  if (!name) {
    return <>-</>;
  }

  if (!person) {
    return <>{name}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}${search ? `?${search}` : ''}`}
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
