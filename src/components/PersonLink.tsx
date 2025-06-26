import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={({ isActive }: { isActive: boolean }) =>
        cn({
          'has-text-danger': person.sex === 'f',
          'is-active': isActive,
        })
      }
    >
      {person.name}
    </NavLink>
  );
};
