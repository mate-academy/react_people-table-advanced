import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LinkProps } from './LinkProps';

export const PersonLink: React.FC<LinkProps> = React.memo(({ person }) => {
  const { sex, name, slug } = person;

  const location = useLocation().search;

  return (
    <Link
      className={classNames({ 'has-text-danger': sex === 'f' })}
      to={`/people/${slug}${location}`}
    >
      {name}
    </Link>
  );
});
