import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${person?.slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({
        'has-text-danger': person && person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
