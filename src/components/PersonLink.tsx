import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  people: Person[];
  name: string | null;
};

export const PersonLink: React.FC<Props> = ({ people, name }) => {
  const findedPerson = people.find(person => person.name === name);

  return findedPerson ? (
    <Link
      to={`/people/${findedPerson.slug}`}
      className={classNames({ 'has-text-danger': findedPerson.sex === 'f' })}
    >
      {findedPerson.name}
    </Link>
  ) : (
    <span>{name}</span>
  );
};
