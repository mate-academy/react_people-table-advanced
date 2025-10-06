import * as React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

const PersonLink: React.FC<{ person: Person }> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const search = searchParams.toString();

  return (
    <NavLink
      to={{
        pathname: `/people/${person.slug}`,
        search: search ? `?${search}` : '',
      }}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </NavLink>
  );
};

export default PersonLink;
