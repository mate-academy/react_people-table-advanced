import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search,
      }}
      className={classNames({
        'has-text-danger': person.sex === 'f',
        'has-text-link': person.sex === 'm',
      })}
    >
      {person.name}
    </Link>
  );
};
