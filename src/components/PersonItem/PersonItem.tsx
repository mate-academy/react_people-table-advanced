import React from 'react';
import classNames from 'classnames';

import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';

interface Props {
  person: Person;
}

export const PersonItem: React.FC<Props> = ({ person }) => {
  const { currentSlug } = useParams();
  const { sex, born, died, slug, mother, father, motherName, fatherName } =
    person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === currentSlug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother} /> : motherName || '-'}</td>
      <td>{father ? <PersonLink person={father} /> : fatherName || '-'}</td>
    </tr>
  );
};
