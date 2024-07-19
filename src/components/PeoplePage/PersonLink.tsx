import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';

type Props = {
  person: { sex: string; slug: string; name: string };
};

export const PersonLink: React.FC<Props> = ({
  person: { sex, slug, name },
}) => {
  const { search } = useLocation();

  return (
    <Link
      className={classNames({ 'has-text-danger': sex === 'f' })}
      to={{ pathname: `/people/${slug}`, search }}
    >
      {name}
    </Link>
  );
};
