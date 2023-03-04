import React from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, slug } = person;
  const location = useLocation();

  return (
    <Link
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
      to={{
        pathname: `/people/${slug}`,
        search: location.search,
      }}
    >
      {name}
    </Link>
  );
};
