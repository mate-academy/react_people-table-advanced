import React from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({
  person: { name, sex, slug },
}) => {
  const [searchParams] = useSearchParams();
  const slugWithParams = slug + '?' + searchParams.toString();

  return (
    <Link
      to={slugWithParams}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
