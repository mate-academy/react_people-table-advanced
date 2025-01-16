import classNames from 'classnames';
import { Person } from '../types';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  person: Person;
};

enum Sex {
  Female = 'f',
  Male = 'm',
}

export const PersonLink: React.FC<Props> = (props: Props) => {
  const { person } = props;

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === Sex.Female,
      })}
    >
      {person.name}
    </Link>
  );
};
