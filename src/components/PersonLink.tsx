import React from 'react';
import { Person } from '../types';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: location.search,
      }}
      className={classNames(person.sex === 'f' ? 'has-text-danger' : '')}
    >
      {person.name}
    </Link>
  );
};
