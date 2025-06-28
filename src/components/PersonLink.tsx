import classNames from 'classnames';
import { Person } from '../types';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  searchParams.delete('personSlug');

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString() ? `?${searchParams.toString()}` : '',
      }}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
