import React from 'react';
import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const { slug, name, sex } = person;

  return (
    <NavLink
      to={{
        pathname: `/people/${slug}`,
        search: searchParams.toString(),
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
};
