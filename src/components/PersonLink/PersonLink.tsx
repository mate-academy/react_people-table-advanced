import React from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import classNames from 'classnames';

import { Sex } from '../../enums/Sex';

type Props = {
  name: string;
  sex: Sex;
  slug: string;
};

export const PersonLink: React.FC<Props> = ({
  name,
  sex,
  slug,
}) => {
  const { search } = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  return (
    <Link
      to={{
        pathname: parentPath + slug,
        search,
      }}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
