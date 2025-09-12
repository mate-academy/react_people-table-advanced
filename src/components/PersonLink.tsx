import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person?: Person | null;
};

export const PersonLink = ({ person }: Props) => {
  const location = useLocation();

  if (!person) {
    return <span>-</span>;
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
