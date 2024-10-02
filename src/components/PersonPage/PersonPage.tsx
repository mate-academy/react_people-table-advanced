import { FC } from 'react';
import { Person } from '../../types';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  person: Person;
}
export const PersonPage: FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      to={`/people/${person.slug}${search}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
