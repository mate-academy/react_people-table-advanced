import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex } = person;
  const location = useLocation();
  const isFemale = sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: location.search,
      }}
      className={isFemale}
    >
      {name}
    </Link>
  );
};
