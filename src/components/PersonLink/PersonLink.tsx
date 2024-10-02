import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;

  const classNameLink = sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link className={classNameLink} to={`../${slug}`}>
      {name}
    </Link>
  );
};
