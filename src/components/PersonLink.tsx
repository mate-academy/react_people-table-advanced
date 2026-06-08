import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  name: string | null;
  people: Person[];
};

export const PersonLink = ({ name, people }: Props) => {
  if (!name) {
    return '-';
  }

  const person = people.find(p => p.name === name);

  return person ? (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </Link>
  ) : (
    name
  );
};
