import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <Link
      to={slug ? `../${person.slug}` : `${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
