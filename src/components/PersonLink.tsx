import { Link } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';

interface Props {
  name: string | null;
  people: Person[];
}

export const PersonLink = ({ name, people }: Props) => {
  const person = people.find(p => p.name === name);

  if (!name) {
    return <>-</>;
  }

  if (!person) {
    return <>{name}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
