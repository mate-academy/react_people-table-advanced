import React from 'react';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const { name, sex, slug } = person;

  return (
    <Link
      className={classNames({
        'has-text-danger': sex === 'f',
        '': sex === 'm',
      })}
      to={`/people/${slug}?${searchParams}`}
    >
      {name}
    </Link>
  );
};
