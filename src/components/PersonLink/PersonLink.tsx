import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

export const PersonLink = ({ person }: { person: Person }) => {
  const [searchParams] = useSearchParams();
  const to = `/people/${person.slug}?${searchParams.toString()}`;

  return (
    <Link
      to={to}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
