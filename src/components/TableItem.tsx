import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const TableItem: React.FC<Props> = ({ person, people }) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  const getParent = useMemo(() => {
    return (parentName: string | null) => {
      return people.find(parent => parent.name === parentName);
    };
  }, [people]);

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
      <td><PersonLink person={person} /></td>

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
};
