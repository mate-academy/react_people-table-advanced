import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { PersonProps } from '../../types';

export const PersonLink: React.FC<PersonProps> = ({ person, name }) => {
  if (!person && !name) {
    return <>-</>;
  } else if (person) {
    return (
      <Link
        to={`/people/${person.slug}`}
        className={classNames({ 'has-text-danger': person.sex === 'f' })}
      >
        {person.name}
      </Link>
    );
  }

  return <>{name}</>;
};
