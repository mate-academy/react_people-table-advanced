import React from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import { SexEnum } from '../types/enums';

type Props = {
  person?: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  if (!person) {
    return <span>-</span>;
  }

  const { name, slug, sex } = person;

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: searchParams.toString(),
      }}
      className={cn({ 'has-text-danger': sex === SexEnum.Female })}
    >
      {name}
    </Link>
  );
};
