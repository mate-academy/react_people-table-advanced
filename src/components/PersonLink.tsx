import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const location = useLocation();

  return (
    <Link
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      to={{
        pathname: `/people/${person.slug}`,
        search: location.search,
      }}
    >
      {person.name}
    </Link>
  );
};
