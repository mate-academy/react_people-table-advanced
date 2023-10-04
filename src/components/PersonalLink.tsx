import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import { Person } from '../types';
import { Sex } from '../types/Sex';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === Sex.Femail,
      })}
    >
      {person.name}
    </Link>
  );
};
