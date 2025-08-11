import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  const search = searchParams ? `?${searchParams}` : '';

  return (
    <Link
      to={`/people/${person.slug}${search}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
