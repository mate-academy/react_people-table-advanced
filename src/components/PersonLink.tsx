import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonSex } from '../types/PersonSex';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const [params] = useSearchParams();

  return (
    <Link
      className={classNames({
        'has-text-danger': sex === PersonSex.SEX_FEMALE,
      })}
      to={`/people/${slug}?${params.toString()}`}
    >
      {name}
    </Link>
  );
};
