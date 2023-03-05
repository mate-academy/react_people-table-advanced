import classNames from 'classnames';
import React from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  name?: string,
  hasParent?: Person,
};

export const PersonLink: React.FC<Props> = ({
  name,
  hasParent,
}) => {
  const parentPath = useResolvedPath('../').pathname;
  const location = useLocation();

  return (
    <td>
      {hasParent ? (
        <Link
          to={{
            pathname: `${parentPath}${hasParent.slug}`,
            search: location.search,
          }}
          className={classNames(
            { 'has-text-danger': hasParent.sex === 'f' },
          )}
        >
          {hasParent.name}
        </Link>
      ) : (
        name
      )}
    </td>
  );
};
