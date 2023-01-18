import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonalLink } from './PersonalLink';

type Props = {
  person: Person,
  mother: Person | undefined,
  father: Person | undefined,
};

export const PersonalInfo: React.FC<Props> = ({ person, mother, father }) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': slug === person.slug },
      )}
    >
      <td>
        <PersonalLink person={person} />
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
        {!motherName
          ? '-'
          : (<PersonalLink person={mother || motherName} />)}
      </td>
      <td>
        {!fatherName
          ? '-'
          : (<PersonalLink person={father || fatherName} />)}
      </td>
    </tr>
  );
};
