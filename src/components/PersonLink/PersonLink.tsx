import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  name: string;
  slug: string | null;
  sex?: 'm' | 'f';
};

export const PersonLink: React.FC<Props> = ({ name, slug, sex }) => {
  const { search } = useLocation();

  return slug ? (
    <Link
      to={'../people/' + slug + search}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  ) : (
    name
  );
};
