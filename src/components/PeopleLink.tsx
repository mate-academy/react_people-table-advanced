import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{ pathname: `../${slug}`, search: searchParams.toString() }}
      className={sex === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </Link>
  );
};
