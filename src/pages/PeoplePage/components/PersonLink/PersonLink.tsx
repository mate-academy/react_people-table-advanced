import React from 'react';
import classNames from 'classnames';
import { Person } from '../../../../types/Person';
import { SearchLink } from '../../../../components/SearchLink';
import { Sex } from '../../../../types/Sex';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <SearchLink
      pathname={`/people/${person.slug}`}
      params={{}}
      className={classNames({ 'has-text-danger': person.sex === Sex.Female })}
    >
      {person.name}
    </SearchLink>
  );
};
