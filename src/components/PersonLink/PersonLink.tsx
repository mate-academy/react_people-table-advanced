import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LinkProps } from './LinkProps';

export const PersonLink: React.FC<LinkProps> = React.memo(({ person }) => {
  const location = useLocation().search;

  return (
    <Link
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      to={`/people/${person.slug}${location}`}
    >
      {person.name}
    </Link>
  );
});
