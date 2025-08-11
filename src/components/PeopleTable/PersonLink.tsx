import React from 'react';
import { Person } from '../../types';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Sex } from '../../types/Sex';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const { search } = useLocation();

  return (
    <Link
      to={{ pathname: `/people/${slug}`, search }}
      className={classNames({
        'has-text-danger': sex === Sex.Female,
      })}
    >
      {name}
    </Link>
  );
};
