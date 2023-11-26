import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PeopleLink: React.FC<Props> = ({ person }) => (
  <Link
    to={`/people/${person.slug}`}
    className={cn({
      'has-text-danger': person.sex === 'f',
    })}
  >
    {`${person.name}`}
  </Link>
);
