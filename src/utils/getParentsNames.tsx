import { NavLink } from 'react-router-dom';
import { Person } from '../types';

export const findParentByName = (
  people: Person[],
  parentName: string | null,
) => {
  const parent = people.find(person => person.name === parentName);

  if (parent) {
    return (
      <NavLink
        to={`/people/${parent.slug}`}
        className={parent.sex === 'f' ? 'has-text-danger' : ''}
        replace
      >
        {parent.name}
      </NavLink>
    );
  }

  return parentName || '-';
};
