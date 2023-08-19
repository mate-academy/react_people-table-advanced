import classNames from 'classnames';

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  human: Person;
};

export const PersonLink: React.FC<Props> = ({ human }) => {
  const { search } = useLocation();

  return (
    <Link
      className={classNames({ 'has-text-danger': human.sex === 'f' })}
      to={{
        pathname: human.slug,
        search,
      }}
    >
      {human.name}
    </Link>
  );
};
