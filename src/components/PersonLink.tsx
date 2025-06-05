import { Link } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';

export const PersonLink = ({ person }: { person: Person }) => {
  const { name, sex, slug } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
