import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person,
  motherIs: Person | undefined,
  fatherIs: Person | undefined,
};

export const PersonRow: React.FC<Props> = ({ person, motherIs, fatherIs }) => {
  const {
    sex,
    slug,
    born,
    died,
    fatherName,
    motherName,
  } = person;
  const { personSlug: currSlug } = useParams();

  const checkMotherName = motherName || '-';
  const checkFatherName = fatherName || '-';

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === currSlug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {!motherIs ? (
          checkMotherName
        ) : (
          <PersonLink person={motherIs} />
        )}
      </td>

      <td>
        {!fatherIs ? (
          checkFatherName
        ) : (
          <PersonLink person={fatherIs} />
        )}
      </td>
    </tr>
  );
};
