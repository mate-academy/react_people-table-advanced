import cn from 'classnames';
import { Person } from '../../types';
import React from 'react';
import { Link } from 'react-router-dom';
import { SexFilter } from '../../types/FilterTypes';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`../${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === SexFilter.Female })}
    >
      {person.name}
    </Link>
  );
};
