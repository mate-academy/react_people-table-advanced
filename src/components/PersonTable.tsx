import classNames from 'classnames';
import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  slug?: string;
};

export const PersonTable = React.memo<Props>(({ person, slug }) => {
  const {
    sex,
    born,
    died,
    mother,
    father,
    motherName,
    fatherName,
  } = person;

  const isSelected = (human: Person) => human.slug === slug;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelected(person) })}
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
          : motherName || '-'}
      </td>

      <td>
        {father
          ? <PersonLink person={father} />
          : fatherName || '-'}
      </td>
    </tr>
  );
});
