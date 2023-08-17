import { NavLink } from 'react-router-dom';
import { Person } from '../types';
import { setPersonLinkClassName } from './classNamesSetter';

export const generateNavLink = (person: Person) => {
  const { name, slug } = person;

  return (
    <NavLink to={`/people/${slug}`} className={setPersonLinkClassName(person)}>
      {name}
    </NavLink>
  );
};
