import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
};

export const PeopleRow: React.FC<Props> = ({ person }) => {
  const {
    sex, born, died, fatherName, motherName, father, mother,
  } = person;
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
