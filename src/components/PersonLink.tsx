import { FC } from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink :FC<Props> = ({ person }) => {
  return (
    <Link
      to={person.slug}
      className={classNames({
        'has-text-danger': person.sex === 'f',
        'has-text-link': person.sex === 'm',
      })}
    >
      {person.name}
    </Link>
  );
};
