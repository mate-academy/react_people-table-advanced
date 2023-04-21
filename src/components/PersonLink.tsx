import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

export interface Props {
  person: Person,
}

export const PersonLink: FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames(
        { 'has-text-danger': person.sex === 'f' },
      )}
    >
      {person.name}
    </Link>
  );
};
