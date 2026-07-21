import classNames from 'classnames';

import { Link } from 'react-router-dom';
import React from 'react';
import { Person } from '../../../types';

interface PersonProps {
  person: Person;
  searchParams: URLSearchParams;
}

export const PersonLink: React.FC<PersonProps> = ({ person, searchParams }) => {
  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
