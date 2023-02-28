import cn from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = React.memo(({ person }) => {
  const { name, sex, slug } = person;
  const isWoman = sex === 'f';
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search,
      }}
      className={cn({ 'has-text-danger': isWoman })}
    >
      {name}
    </Link>
  );
});
