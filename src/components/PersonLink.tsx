import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Person from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
