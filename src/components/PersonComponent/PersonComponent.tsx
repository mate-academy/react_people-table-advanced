import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { EMPTY_VALUE } from '../../utils/variablesHelpers';

interface Props {
  person: Person
}

export const PersonComponent: React.FC<Props> = ({ person }) => {
  const { slugId } = useParams();
  const {
    slug,
    sex,
    born,
    died,
    mother,
    father,
    motherName,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={cn({
        'has-background-warning': slug === slugId,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother
          ? <PersonLink person={mother} />
          : motherName || EMPTY_VALUE}
      </td>
      <td>
        {father
          ? <PersonLink person={father} />
          : fatherName || EMPTY_VALUE}
      </td>
    </tr>
  );
};
