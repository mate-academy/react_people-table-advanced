import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person?: Person | null;
};

export const PersonLink = ({ person }: Props) => {
  if (!person) {
    return <span>-</span>;
  }

  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </NavLink>
  );
};
