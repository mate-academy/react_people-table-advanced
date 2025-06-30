import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: FC<PersonLinkProps> = ({ person }) => {
  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={({ isActive }: { isActive: boolean }) =>
        classNames({
          'has-text-danger': person.sex === 'f',
          'is-active': isActive,
        })
      }
    >
      {person.name}
    </NavLink>
  );
};
