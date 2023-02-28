import cn from 'classnames';
import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person,
  currentSlug: string,
}

export const PeopleTableItem: React.FC<Props> = React.memo(
  ({ person, currentSlug }) => {
    const {
      sex,
      born,
      died,
      fatherName,
      motherName,
      slug,
      mother,
      father,
    } = person;

    const isSelected = slug === currentSlug;
    const displayMotherName = motherName || '-';
    const dispalyFatherName = fatherName || '-';

    return (
      <tr
        className={cn({
          'has-background-warning': isSelected,
        })}
        data-cy="person"
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
            : displayMotherName}
        </td>
        <td>
          {father
            ? <PersonLink person={father} />
            : dispalyFatherName}
        </td>
      </tr>
    );
  },
);
