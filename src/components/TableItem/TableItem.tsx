import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
};

export const TableItem: React.FC<Props> = React.memo(({ person, people }) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;
  const getParent = (parentName: string | null) => {
    return people.find(parent => parent.name === parentName);
  };

  const mother = getParent(motherName);
  const father = getParent(fatherName);
  const motherNameText = motherName || '-';
  const fatherNameText = fatherName || '-';
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>
        {sex}
      </td>

      <td>
        {born}
      </td>

      <td>
        {died}
      </td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : motherNameText}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : fatherNameText}
      </td>
    </tr>
  );
});
