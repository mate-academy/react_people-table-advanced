import cn from 'classnames';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  personSlug?: string;
};

export const PeopleLink: React.FC<Props> = ({ person, personSlug }) => {
  const { died, born, sex, motherName, fatherName, mother, father, slug } =
    person;

  const { search } = useLocation();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === personSlug })}
    >
      <td>
        <PersonLink person={person} search={search} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {(mother ? (
          <PersonLink person={mother} search={search} />
        ) : (
          motherName
        )) || '-'}
      </td>
      <td>
        {(father ? (
          <PersonLink person={father} search={search} />
        ) : (
          fatherName
        )) || '-'}
      </td>
    </tr>
  );
};
