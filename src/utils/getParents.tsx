import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

export function getParents(parents?: Person, parentsName?: string | null) {
  if (parents) {
    return (
      <NavLink
        to={parents.slug}
        className={classNames({ 'has-text-danger': parents.sex === 'f' })}
      >
        {parents.name}
      </NavLink>
    );
  }

  if (parentsName) {
    return parentsName;
  }

  return '-';
}
