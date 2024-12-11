import React from 'react';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={classNames({ 'has-text-danger': sex === 'f' })}
      to={{ pathname: `/people/${slug}`, search: searchParams.toString() }}
    >
      {name}
    </Link>
  );
};
