import { NavLink } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

export const findParentByName = (
  people: Person[],
  parentName: string | null,
) => {
  const parent = people.find(person => person.name === parentName);

  if (parent) {
    return (
      <NavLink
        to={`/people/${parent.slug}`}
        className={classNames({ 'has-text-danger': parent.sex === 'f' })}
        replace
      >
        {parent.name}
      </NavLink>
    );
  }

  return parentName || '-';
};
