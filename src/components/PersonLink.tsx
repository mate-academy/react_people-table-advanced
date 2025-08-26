import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../types';

interface PersonLinkProps {
  name: string | null;
  people: Person[];
}

export const PersonLink: React.FC<PersonLinkProps> = ({ name, people }) => {
  const person = people.find(p => p.name === name);
  const location = useLocation();

  if (!person) {
    return <>{name}</>;
  }

  return (
    <NavLink
      to={{
        pathname: `/people/${person.slug}`,
        search: location.search,
      }}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </NavLink>
  );
};
