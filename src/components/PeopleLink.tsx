import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Prop = {
  person: Person;
};

export const PeopleLink: React.FC<Prop> = ({ person }) => {
  const { search } = useLocation();

  return (
    <NavLink
      to={`${person.slug}${search}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </NavLink>
  );
};
