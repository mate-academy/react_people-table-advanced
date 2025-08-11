import { NavLink } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
}

export const PersonExistLink: React.FC<Props> = ({ person }) => {
  return (
    <NavLink
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={`${person.slug}`}
    >
      {person.name}
    </NavLink>
  );
};
