import cn from 'classnames';
import React from 'react';
import { Person } from '../types';
import { PersonalLink } from './PersonalLink';

type Props = {
  person: Person,
  selectedUser: string,
};

const WITHOUT_RELATIVE = '-';

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
            motherName || WITHOUT_RELATIVE
          )}
      </td>

      <td>
        {father ? (
          <PersonalLink person={father} />
        )
          : (
            fatherName || WITHOUT_RELATIVE
          )}
      </td>
    </tr>
  );
};
