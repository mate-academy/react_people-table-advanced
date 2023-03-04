import React from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const { search } = useLocation();

  return (
    <Link
      className={cn({ 'has-text-danger': sex === 'f' })}
      to={{
        pathname: `/people/${slug}`,
        search,
      }}
    >
      {name}
    </Link>
  );
};
