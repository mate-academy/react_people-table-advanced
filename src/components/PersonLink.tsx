import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person?: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const isFemale = person?.sex === 'f';
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person?.slug}`,
        search: location.search,
      }}
      className={classNames({ 'has-text-danger': isFemale })}
    >
      {person?.name}
    </Link>
  );
};
