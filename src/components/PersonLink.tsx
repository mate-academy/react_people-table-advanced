import React, { memo } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = memo(({ person }) => (
  <Link
    to={`../${person.slug}`}
    className={cn({ 'has-text-danger': person.sex === 'f' })}
  >
    {person.name}
  </Link>
));
