import React from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

type Props = {
  person: Person;
};

const PersonField: React.FC<Props> = ({ person }) => {
  const { slug, born, died, sex, motherName, mother, fatherName, father } =
    person;

  const { personSlug } = useParams();
  const selectedPersonSlug = personSlug ? personSlug : null;

  return (
    <tr
      key={slug}
      data-cy="person"
      className={cn({
        'has-background-warning': selectedPersonSlug === slug,
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

export default PersonField;
