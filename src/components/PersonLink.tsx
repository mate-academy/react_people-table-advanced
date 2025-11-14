import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <NavLink
      to={`/people/${person.slug}${search}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </NavLink>
  );
};
