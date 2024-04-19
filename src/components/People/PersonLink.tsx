import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  person: Person;
  isPersonFemale: (human: Person) => boolean;
};

export const PersonLink: React.FC<Props> = ({ person, isPersonFemale }) => {
  return (
    <Link
      className={cn({ 'has-text-danger': isPersonFemale(person) })}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};
