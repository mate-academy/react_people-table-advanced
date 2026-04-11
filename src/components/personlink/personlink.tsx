import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PersonProps } from '../../types';

export const PersonLink: React.FC<PersonProps> = ({ person, name }) => {
  const { search } = useLocation();

  if (!person && !name) {
    return <>-</>;
  } else if (person) {
    return (
      <Link
        to={{ pathname: `/people/${person.slug}`, search: search }}
        className={classNames({ 'has-text-danger': person.sex === 'f' })}
      >
        {person.name}
      </Link>
    );
  }

  return <>{name}</>;
};
