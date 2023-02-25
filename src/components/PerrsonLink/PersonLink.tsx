import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Partial<Person>;
};

export const PersonLink: React.FC<Props> = React.memo(
  ({ person }) => (
    <>
      <Link
        to={`/people/${person.slug}`}
        className={classNames('todo', {
          'has-text-danger': person.sex === 'f',
          'has-text-grey': person.sex === 'm',
        })}
      >
        {person.name}
      </Link>
    </>
  ),
);
