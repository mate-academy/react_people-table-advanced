import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type PersonLinkProps = {
  person: Person,
};

export const PersonLink:React.FC<PersonLinkProps> = ({ person }) => {
  const { name, sex, slug } = person;

  return (
    <Link
      to={`../${slug}`}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
