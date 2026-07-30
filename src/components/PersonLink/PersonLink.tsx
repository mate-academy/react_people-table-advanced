import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person?: Person;
  name?: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (!person && !name) {
    return <span>-</span>;
  }

  if (person) {
    const isFemale = person.sex === 'f';

    return (
      <Link
        to={`/people/${person.slug}`}
        className={isFemale ? 'has-text-danger' : ''}
      >
        {person.name}
      </Link>
    );
  }

  return <span>{name}</span>;
};
