import React from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person | string | null;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  if (typeof person === 'string') {
    return person;
  }

  if (person === null) {
    return '-';
  }

  return (
    <>
      <Link
        className={classNames({
          'has-text-danger': person?.sex === 'f',
        })}
        to={`/people/${person?.slug}${search}`}
      >
        {person?.name}
      </Link>
    </>
  );
};
