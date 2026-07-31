import { Person } from '../../types';
import React from 'react';
import { SearchLink } from '../SearchLink';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <SearchLink
      pathname={`/people/${person.slug}`}
      params={{}}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </SearchLink>
  );
};
