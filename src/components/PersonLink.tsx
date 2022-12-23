import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink = React.memo<Props>(({ person }) => {
  const { name, slug, sex } = person;

  return (
    <Link
      className={classNames({ 'has-text-danger': sex === 'f' })}
      to={`../${slug}`}
    >
      {name}
    </Link>
  );
});
