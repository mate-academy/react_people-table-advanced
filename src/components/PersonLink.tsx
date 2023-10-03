import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { SEX_FEMALE } from '../utils/constants';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      className={classNames({
        'has-text-danger': person.sex === SEX_FEMALE,
      })}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};
