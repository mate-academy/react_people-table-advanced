import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../../../types/Person';
import { PersonLink } from '../PersonLink';

const noParentStr = '-';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonRow: React.FC<Props> = ({ person, people }) => {
  const { slug, sex, born, died, motherName, fatherName } = person;

  const { personSlug } = useParams();

  const mother = person.motherName
    ? people.find(p => p.name === person.motherName)
    : null;
  const father = person.fatherName
    ? people.find(p => p.name === person.fatherName)
    : null;

  return (
    <tr
      data-cy="person"
      className={classNames({
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
        {mother && <PersonLink person={mother} />}
        {!mother && motherName}
        {!mother && !motherName && noParentStr}
      </td>

      <td>
        {father && <PersonLink person={father} />}
        {!father && fatherName}
        {!father && !fatherName && noParentStr}
      </td>
    </tr>
  );
};
