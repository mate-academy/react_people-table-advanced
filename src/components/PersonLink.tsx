import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cl from 'classnames';

import { Person } from '../types';

type Props = {
  name: string | null;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ name, people }) => {
  const location = useLocation();

  if (!name) {
    return <span>-</span>;
  }

  const foundPerson = people.find(person => person.name === name);

  if (!foundPerson) {
    return <span>{name}</span>;
  }

  return (
    <Link
      to={{
        pathname: `/people/${foundPerson.slug}`,
        search: location.search,
      }}
      className={cl({ 'has-text-danger': foundPerson.sex === 'f' })}
    >
      {name}
    </Link>
  );
};
