import React from 'react';
import cn from 'classnames';

import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person;
}

export const PersonItem: React.FC<Props> = ({ person }) => {
  const { currentSlug } = useParams();
  const {
    slug: personSlug,
    sex,
    born,
    died,
    mother,
    father,
    motherName,
    fatherName,
  } = person;

  const isPersonFemale = (human: Person) => human.sex === 'f';

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': currentSlug === personSlug })}
    >
      <td>
        <PersonLink person={person} isPersonFemale={isPersonFemale} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} isPersonFemale={isPersonFemale} />
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <PersonLink person={father} isPersonFemale={isPersonFemale} />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
