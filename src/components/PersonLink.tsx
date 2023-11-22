import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  name: string,
  slug: string
  isActive: boolean,
};

export const PersonLink: React.FC<Props> = ({ name, slug, isActive }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={classNames({ 'has-text-danger': isActive })}
      to={{
        pathname: `/people/${slug}`,
        search: searchParams.toString(),
      }}
    >
      {name}
    </Link>
  );
};
