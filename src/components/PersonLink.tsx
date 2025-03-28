import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
  onSelect: (slug: string) => void;
};

export const PersonLink: React.FC<Props> = ({ person, onSelect }) => {
  return (
    <>
      <Link
        to={`/people/${person.slug}`}
        className={classNames({
          'has-text-danger': person.sex === 'f',
        })}
        onClick={() => onSelect(person.slug)}
      >
        {person.name}
      </Link>
    </>
  );
};