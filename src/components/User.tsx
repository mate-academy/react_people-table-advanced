import cn from 'classnames';
import React from 'react';
import { Person } from '../types';
import { PersonalLink } from './PersonalLink';

type Props = {
  person: Person,
  selectedUser: string,
};

const NOT_SET_VALUE = '-';

export const User: React.FC<Props> = ({ person, selectedUser }) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
    mother,
    father,
  } = person;

  return (
    <tr
      key={slug}
      className={cn({ 'has-background-warning': slug === selectedUser })}
      data-cy="person"
    >
      <td>
        <PersonalLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonalLink person={mother} />
        )
          : (
            motherName || NOT_SET_VALUE
          )}
      </td>

      <td>
        {father ? (
          <PersonalLink person={father} />
        )
          : (
            fatherName || NOT_SET_VALUE
          )}
      </td>
    </tr>
  );
};
