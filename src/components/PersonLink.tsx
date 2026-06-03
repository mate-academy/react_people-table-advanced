import { NavLink, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

export const PersonLink = ({ person }: { person: Person }) => {
  const [searchParams] = useSearchParams();

  return (
    <NavLink
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({ 'has-text-danger': person.sex == 'f' })}
    >
      {person.name}
    </NavLink>
  );
};
