import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  parent: string | null
  getPersonByParent: (value: string | null) => Person | undefined
};

export const PersonLink: React.FC<Props> = ({
  parent,
  getPersonByParent,
}) => {
  const personIsParent = getPersonByParent(parent);

  if (!parent) {
    return (
      <td> - </td>
    );
  }

  return (
    <td>
      {personIsParent ? (
        <NavLink
          className={classNames({
            'has-text-danger': personIsParent?.sex === 'f',
          })}
          to={`/people/${personIsParent?.slug}`}
        >
          {parent}
        </NavLink>
      ) : parent}
    </td>
  );
};
