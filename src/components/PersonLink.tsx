import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const isFemale = person?.sex === 'f';

  return (
    <NavLink
      to={`/people/${person?.slug}`}
      className={cn({ 'has-text-danger': isFemale })}
    >
      {person?.name}
    </NavLink>
  );
};
