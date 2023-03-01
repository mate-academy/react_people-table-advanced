import classNames from 'classnames';
import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonNavLink: FC<Props> = ({ person }) => {
  const { search } = useLocation();
  const isWomen = person.sex === 'f';

  return (
    <NavLink
      to={{
        pathname: `../${person.slug}`,
        search,
      }}
      className={() => (
        classNames({ 'has-text-danger': isWomen })
      )}
    >
      {person.name}
    </NavLink>
  );
};
