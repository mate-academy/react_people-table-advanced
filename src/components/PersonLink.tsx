import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = { person: Person };

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();
  const isSelected = location.pathname === `/people/${person.slug}`;

  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={`${person.sex === 'f' ? 'has-text-danger' : ''} ${
        isSelected ? 'has-background-warning' : ''
      }`}
    >
      {person.name}
    </NavLink>
  );
};
