import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

const PersonLink: React.FC<{ person: Person }> = ({ person }) => {
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
