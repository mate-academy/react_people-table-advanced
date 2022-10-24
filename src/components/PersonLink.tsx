import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person
};

export const PersonalLink: FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
