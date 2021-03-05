import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { PersonNameProps } from './typesDefinitions'

export const PersonName: FC<PersonNameProps> = ({ person }) => {
  const { search } = useLocation();

  if (!person) {
    return <></>;
  };

  const { name, sex, slug } = person;
  return (
    <Link
      to={`/people/${slug}${search}`}
      className={classNames("normal-link", {
        'text-primary': sex === 'm',
        'text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
