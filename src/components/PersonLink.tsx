import React from 'react';
import classNames from 'classnames';
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
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </SearchLink>
  );
};
