import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

export const PersonLink = ({ person }: { person: Person }) => {
  const location = useLocation();

  if (!person) {
    return null;
  }

  return (
    <NavLink
      to={{
        pathname: `/people/${person.slug}`,
        search: location.search,
      }}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </NavLink>
  );
};
