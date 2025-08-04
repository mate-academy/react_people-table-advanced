import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface LinkProps {
  person: Person | null | undefined;
  name: string;
}

export const PersonLink: React.FC<LinkProps> = ({ person, name }) => {
  const displayName = person ? person.name : name;

  const isFemale = person?.sex === 'f';

  if (person) {
    return (
      <Link
        to={`/people/${person.slug}`}
        className={classNames({ 'has-text-danger': isFemale })}
      >
        {displayName}
      </Link>
    );
  }

  return (
    <span className={classNames({ 'has-text-danger': false })}>
      {displayName}
    </span>
  );
};
