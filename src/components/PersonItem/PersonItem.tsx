import React, { useMemo } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

interface Props {
  person: Person,
  findPerson: (name: string | null) => Person | undefined,
}

export const PersonItem: React.FC<Props> = ({
  person,
  findPerson,
}) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  const { personSlug } = useParams();
  const mother = useMemo(() => findPerson(motherName), [motherName]);
  const father = useMemo(() => findPerson(fatherName), [fatherName]);

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': personSlug === slug,
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
          ? (
            <PersonLink person={mother} />
          ) : (motherName || '-')}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          (fatherName || '-')
        )}
      </td>
    </tr>
  );
};
