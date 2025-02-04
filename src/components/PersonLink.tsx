import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Person } from '../types/Person';

type Props = {
  person: Person;
  searchParams: URLSearchParams;
};

export const PersonLink: React.FC<Props> = ({ person, searchParams }) => {
  return (
    <Link
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
      to={{ pathname: `./${person.slug}`, search: searchParams.toString() }}
    >
      {person.name}
    </Link>
  );
};
