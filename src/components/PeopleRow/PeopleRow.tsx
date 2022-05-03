import React from 'react';
import {
  useParams,
} from 'react-router-dom';
import { PersonName } from '../PersonName/PersonName';

type Props = {
  person: UpdatedPersons,
};

export const PeopleRow: React.FC<Props> = ({ person }) => {
  const {
    sex, born, died, fatherName, motherName,
  } = person;
  const { personSlug } = useParams<{ personSlug: string }>();

  return (
    <tr
      className={personSlug === person.slug ? 'is-active' : ''}
    >
      <td>
        <PersonName person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {person.father
          ? <PersonName person={person.father} />
          : <strong>{fatherName}</strong>}
      </td>
      <td>
        {person.mother
          ? <PersonName person={person.mother} />
          : <strong>{motherName}</strong>}
      </td>
    </tr>
  );
};
