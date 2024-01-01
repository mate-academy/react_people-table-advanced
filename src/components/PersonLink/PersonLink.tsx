import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import type { Person } from '../../types';
import { Sex } from '../../types/Sex';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link to={`/people/${person.slug}`} className={cn({ 'has-text-danger': person.sex === Sex.FEMALE })}>
      {person.name}
    </Link>
  );
};
