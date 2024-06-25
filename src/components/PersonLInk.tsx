import React from 'react';
import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({
  person: { name, sex, slug },
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={cn({ 'has-text-danger': sex === 'f' })}
      to={{
        pathname: `../${slug}`,
        search: searchParams.toString(),
      }}
    >
      {name}
    </Link>
  );
};
