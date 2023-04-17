import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({
  person: {
    name,
    sex,
    slug,
  },
}) => (
  <Link
    to={`/people/${slug}`}
    className={classNames(
      {
        'has-text-danger': sex === 'f',
      },
    )}
  >
    {name}
  </Link>
);
