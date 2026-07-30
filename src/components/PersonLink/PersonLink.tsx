import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person?: Person;
  name?: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  const location = useLocation();

  if (!person && !name) {
    return <span>-</span>;
  }

  if (person) {
    const isFemale = person.sex === 'f';

    return (
      <Link
        to={{ pathname: `/people/${person.slug}`, search: location.search }}
        className={isFemale ? 'has-text-danger' : ''}
      >
        {person.name}
      </Link>
    );
  }

  return <span>{name}</span>;
};
