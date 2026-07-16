import { useLocation, Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  name: string | null;
  people: Person[];
};

export const PersonLink = ({ name, people }: Props) => {
  const location = useLocation();

  if (!name) {
    return <>-</>;
  }

  const person = people.find(p => p.name === name);

  if (!person) {
    return <>{name}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}${location.search}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </Link>
  );
};
