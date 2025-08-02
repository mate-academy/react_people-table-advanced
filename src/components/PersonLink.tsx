import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import React from 'react';

type Props = {
  personName: string | null;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ personName, people }) => {
  if (!personName) {
    return '-';
  }

  const matchPerson = people.find(human => human.name === personName);

  if (matchPerson) {
    return (
      <Link
        to={`/people/${matchPerson.slug}`}
        className={classNames({ 'has-text-danger': matchPerson.sex === 'f' })}
      >
        {matchPerson.name}
      </Link>
    );
  }

  return <>{personName}</>;
};
