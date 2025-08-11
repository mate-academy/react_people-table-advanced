import React from 'react';
import { emptyPerson, Person } from '../../types';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
type Props = {
  person: Person;
};

export const PersonComponent: React.FC<Props> = ({ person }) => {
  const personSlug = useParams();
  const { sex, born, died, mother, father, motherName, fatherName } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug.personSlug === person.slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? <PersonLink person={mother} /> : motherName || emptyPerson}
      </td>
      <td>
        {father ? <PersonLink person={father} /> : fatherName || emptyPerson}
      </td>
    </tr>
  );
};
