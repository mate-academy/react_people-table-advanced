import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, name, sex } = person;
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
