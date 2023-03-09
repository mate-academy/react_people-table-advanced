import classNames from 'classnames';
import React from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  personName?: string,
  parent?: Person,
};

export const PersonLink: React.FC<Props> = ({
  personName,
  parent,
}) => {
  const parentPath = useResolvedPath('../').pathname;
  const location = useLocation();
  const {
    name,
    sex,
    slug,
  } = parent || {};

  return (
    <td>
      {parent ? (
        <Link
          to={{
            pathname: `${parentPath}${slug}`,
            search: location.search,
          }}
          className={classNames(
            { 'has-text-danger': sex === 'f' },
          )}
        >
          {name}
        </Link>
      ) : (
        personName
      )}
    </td>
  );
};
