import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <Link
      to={`../${person.slug}/${location.search}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
