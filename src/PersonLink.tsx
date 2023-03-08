import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { Person } from './types';

type Props = {
  person: Person,
};

export const PersonNavLink: FC<Props> = ({ person }) => {
  const isWoman = person.sex === 'f';
  const location = useLocation();

  return (
    <NavLink
      to={{
        pathname: `/people/${person.slug}`,
        search: location.search,
      }}
      className={() => (classNames({ 'has-text-danger': isWoman }))}
    >
      {person.name}
    </NavLink>
  );
};
