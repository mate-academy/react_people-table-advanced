import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { PersonLink } from '../../PersonLink';
import type { Person } from '../../../types';

interface Props {
  person: Person;
}

export const PersonItem: React.FC<Props> = ({ person }) => {
  const { slug: selectedSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn(
        { 'has-background-warning': person.slug === selectedSlug },
      )}
    >
      <td aria-label={person.name}>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother
          ? <PersonLink person={person.mother} />
          : person.motherName || '-'}
      </td>

      <td>
        {person.father
          ? <PersonLink person={person.father} />
          : person.fatherName || '-'}
      </td>
    </tr>
  );
};
