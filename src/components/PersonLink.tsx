import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';
import { AppRoutes } from '../Root';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();
  const { sex, slug, name } = person;

  return (
    <Link
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
      to={{ pathname: `/${AppRoutes.People}/${slug}`, search }}
    >
      {name}
    </Link>
  );
};
