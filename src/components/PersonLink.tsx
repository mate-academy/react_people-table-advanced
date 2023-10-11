import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person,
}

export const PersonLink:React.FC<PersonLinkProps> = ({ person }) => {
  const { name, sex, slug } = person;

  return (
    <NavLink
      to={`/people/${slug}`}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </NavLink>
  );
};
