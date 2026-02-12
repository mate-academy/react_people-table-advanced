import React from 'react';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <SearchLink
      to={`/people/${person.slug}`}
      params={{}}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </SearchLink>
  );
};
