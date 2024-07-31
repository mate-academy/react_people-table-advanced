import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';
import React, { FC } from 'react';
import { SexEnum } from './SexEnum';

type Props = {
  person?: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const location = useLocation();
  const searchParams = location.search;

  return (
    <Link
      to={`/people/${person?.slug}${searchParams}`}
      className={classNames({
        'has-text-danger': person?.sex === SexEnum.Female,
      })}
    >
      {person?.name}
    </Link>
  );
};
