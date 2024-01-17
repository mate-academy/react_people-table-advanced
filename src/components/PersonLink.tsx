import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <NavLink
      className={cn({ 'has-text-danger': person.sex === 'f' })}
      to={{ pathname: `/people/${person.slug}`, search }}
    >
      {person.name}
    </NavLink>
  );
};
