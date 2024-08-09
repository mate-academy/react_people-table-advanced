import cn from 'classnames';
import { Person } from '../../types/Person';
import { NavLink } from 'react-router-dom';
import { Sex } from '../..//types/Sex';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <NavLink
      className={cn({ 'has-text-danger': person.sex === Sex.Female })}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </NavLink>
  );
};
