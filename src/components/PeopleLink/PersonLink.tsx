import React, { memo } from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = memo(({ person }) => {
  const location = useLocation();

  return (
    <Link
      to={`../${person.slug}${location.search}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
});
