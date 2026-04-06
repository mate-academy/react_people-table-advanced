import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  name?: string;
};

export const PersonLink = ({ person, name }: Props) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {name || person.name}
    </Link>
  );
};
