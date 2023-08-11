import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface PersonDataProps {
  person: Person;
}

const PersonLink: React.FC<PersonDataProps> = ({ person }) => {
  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </NavLink>
  );
};

export default PersonLink;
