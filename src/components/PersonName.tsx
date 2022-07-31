import React from 'react';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  person: Person;
};

const PersonName: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <NavLink
      to={{
        pathname: `/people/${person.slug}`,
        search,
      }}
      className={classNames({
        person: true,
        person__male: person.sex === 'm',
        person__female: person.sex === 'f',
      })}
    >
      {person.name}
    </NavLink>
  );
};

export default React.memo(PersonName);
