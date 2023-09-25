import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  person: Person
};

export const PersonNav: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <td>
      <Link
        to={`/people/${person.slug}${search}`}
        className={classNames('', {
          'has-text-danger': person.sex === 'f',
        })}
      >
        {person.name}
      </Link>
    </td>
  );
};
