import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person, Sex } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const { slug, sex, name } = person;

  return (
    <Link
      to={`../${slug}?${searchParams.toString()}`}
      className={classNames({
        'has-text-danger': sex === Sex.Female,
      })}
    >
      {name}
    </Link>
  );
};
