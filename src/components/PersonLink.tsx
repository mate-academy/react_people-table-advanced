import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Partial<Person>;
};

export const PersonLink: React.FC<Props> = React.memo(({ person }) => {
  const {
    slug,
    sex,
    name,
  } = person;
  const { search } = useLocation();
  const isWoman = sex === 'f';

  return (
    <Link
      to={({
        pathname: `/people/${slug}`,
        search,
      })}
      className={classNames({ 'has-text-danger': isWoman })}
    >
      {name}
    </Link>
  );
});
