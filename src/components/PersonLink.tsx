import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person
  searchParams: URLSearchParams,
};

export const PersonLink: React.FC<Props> = ({ person, searchParams }) => (
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
