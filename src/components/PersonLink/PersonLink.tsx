import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={classNames({ 'has-text-danger': sex === 'f' })}
      to={{
        pathname: `/people/${slug}`,
        search: searchParams.toString(),
      }}
    >
      {name}
    </Link>
  );
};
