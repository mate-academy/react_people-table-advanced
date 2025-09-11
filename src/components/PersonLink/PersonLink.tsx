import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  name: string;
  slug?: string;
  sex?: string;
};

export const PersonLink: React.FC<Props> = ({ name, slug, sex }) => {
  const location = useLocation();

  if (slug) {
    return (
      <Link
        to={{
          pathname: `/people/${slug}`,
          search: location.search,
        }}
        className={cn({ 'has-text-danger': sex === 'f' })}
      >
        {name}
      </Link>
    );
  }

  return name;
};
