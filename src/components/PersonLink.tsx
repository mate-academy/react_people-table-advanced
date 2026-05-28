import { Person } from '../types';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

export const PersonLink = ({ person }: { person: Person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={`/people/${person.slug}?${searchParams.toString()}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
