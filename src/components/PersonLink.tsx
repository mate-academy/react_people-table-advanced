import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SEX_FEMALE } from '../utils/constants';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const [params] = useSearchParams();

  return (
    <Link
      className={classNames({
        'has-text-danger': sex === SEX_FEMALE,
      })}
      to={`/people/${slug}?${params.toString()}`}
    >
      {name}
    </Link>
  );
};
