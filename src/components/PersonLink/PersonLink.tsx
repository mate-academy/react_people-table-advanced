import classNames from 'classnames';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = React.memo(
  ({ person }) => {
    const { name, sex, slug } = person;
    const { search } = useLocation();

    return (
      <NavLink
        to={{
          pathname: `/people/${slug}`,
          search,
        }}
        className={() => (
          classNames({
            'has-text-danger': sex === 'f',
          })
        )}
      >
        {name}
      </NavLink>
    );
  },
);
