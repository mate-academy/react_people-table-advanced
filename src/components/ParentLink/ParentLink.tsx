import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  parent: Person | undefined,
  parentName?: string,
};

export const ParentLink: React.FC<Props> = ({ parent, parentName }) => (
  parent
    ? (
      <Link
        to={`/people/${parent.slug}`}
        className={classNames(
          { 'has-text-danger': parent.sex === 'f' },
        )}
      >
        {parent.name || '-'}
      </Link>
    ) : (
      <span>
        {parentName || '-'}
      </span>
    )
);
