import classNames from 'classnames';
import { Person } from '../types';
import React from 'react';

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
    <a
      href={`#/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === Sex.Female,
      })}
    >
      {person.name}
    </a>
  );
};
