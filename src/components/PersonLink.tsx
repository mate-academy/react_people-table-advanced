import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const isWoman = sex === 'f';

  return (
    <Link
      className={classNames({ 'has-text-danger': isWoman })}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  );
};
