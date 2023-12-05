/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonType } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: PersonType;
};

export const Person: React.FC<Props> = ({ person }) => {
  const {
    sex,
    born,
    died,
    slug,
    fatherName,
    motherName,
    father,
    mother,
  } = person;

  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td><PersonLink person={person} /></td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? <PersonLink person={mother} />
          : motherName || '-'}
      </td>

      <td>
        {father
          ? <PersonLink person={father} />
          : fatherName || '-'}
      </td>
    </tr>
  );
};
