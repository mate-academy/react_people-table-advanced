import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const [searchedParams] = useSearchParams();
  const searchedSlug = searchedParams.toString();

  return (
    <Link
      to={`../people/${person.slug}?${searchedSlug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
