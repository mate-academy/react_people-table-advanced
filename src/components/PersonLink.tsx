import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  people: Person[];
  person: Person;
  name: string;
};

export const PersonLink: React.FC<Props> = ({ people, person, name }) => {
  const isExistName = people.some(personName => name === personName.name);

  return isExistName && person ? (
    <Link
      to={`${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {name}
    </Link>
  ) : (
    <p>{name}</p>
  );
};
