import React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();

  return (
    <Link
      to={personSlug ? `../${person.slug}` : person.slug}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
