import { NavLink } from 'react-router-dom';

export const PersonLink = ({ person, people, name }) => {
  if (!name) {
    return '-';
  }

  const foundPerson = people.find(p => p.name === name);

  return foundPerson ? (
    <NavLink
      to={`/people/${person.slug}`}
      className={`has-text-link ${person.sex === 'f' ? 'has-text-danger' : ''}`}
    >
      {name}
    </NavLink>
  ) : (
    name
  );
};
