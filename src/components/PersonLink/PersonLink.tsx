import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person?: Person;
  name: string | null;
}

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  const location = useLocation();

  if (!name) {
    return <>-</>;
  }

  if (person) {
    return (
      <Link
        to={{
          pathname: `/people/${person.slug}`,
          search: location.search,
        }}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {name}
      </Link>
    );
  }

  return <>{name}</>;
};
