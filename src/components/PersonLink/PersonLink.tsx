import { Link, useSearchParams } from 'react-router-dom';
import React from 'react';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const { name, slug, sex } = person;

  return (
    <Link
      to={{
        pathname: `../${slug}`,
        search: searchParams.toString(),
      }}
      className={cn({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
