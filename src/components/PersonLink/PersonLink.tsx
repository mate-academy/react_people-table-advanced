import { Link, useSearchParams } from 'react-router-dom';
import { FC } from 'react';
import cn from 'classnames';
import { Person } from '../../types';
import React from 'react';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: searchParams.toString(),
      }}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
