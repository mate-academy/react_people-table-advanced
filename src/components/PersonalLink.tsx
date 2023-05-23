import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person | string,
};

export const PersonalLink: React.FC<Props> = ({ person }) => {
  if (typeof person === 'string') {
    return (
      <>
        {person}
      </>
    );
  }

  const {
    slug,
    sex,
    name,
  } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
