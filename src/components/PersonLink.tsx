import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  sex: string;
  slug: string;
  name: string;
};

export const PersonLink: React.FC<Props> = ({ sex, slug, name }) => {
  const { search } = useLocation();

  return (
    <Link
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
      to={`/people/${slug}${search}`}
    >
      {name}
    </Link>
  );
};
