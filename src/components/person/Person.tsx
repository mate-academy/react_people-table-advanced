import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person:Person
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <td>
      <Link
        to={`/people/${person.slug}${location.search}`}
        className={classNames('', {
          'has-text-danger': person.sex === 'f',
        })}
      >
        {person.name}
      </Link>
    </td>
  );
};
