import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  name: string | null;
  people: Person[];
};

export const PeopleLink: React.FC<Props> = ({ name, people }: Props) => {
  if (!name) {
    return <span>-</span>;
  }

  const person = people.find(human => human.name === name);

  if (!person) {
    return <span>{name}</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
