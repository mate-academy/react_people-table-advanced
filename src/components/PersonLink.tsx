import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    to={`../${person.slug}`}
    className={classNames({
      'has-text-danger': person.sex === 'f',
    })}
  >
    {person.name}
  </Link>
);
