import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  sex: string;
  slug: string;
  name: string;
};

export const PersonLink: React.FC<Props> = ({ sex, slug, name }) => {
  return (
    <Link
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  );
};
