import React from 'react';
import { Person } from '../../types';
import cn from 'classnames';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  isSelected: boolean;
};

export const PersonRow: React.FC<Props> = ({
  person: {
    slug,
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    father,
    mother,
  },
  isSelected,
}) => {
  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': isSelected })}
    >
      <td>
        <PersonLink name={name} slug={slug} sex={sex as 'm' | 'f'} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        <PersonLink
          name={motherName || '-'}
          slug={mother?.slug || null}
          sex={'f'}
        />
      </td>
      <td>
        <PersonLink
          name={fatherName || '-'}
          slug={father?.slug || null}
          sex="m"
        />
      </td>
    </tr>
  );
};
