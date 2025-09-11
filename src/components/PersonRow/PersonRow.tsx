import React from 'react';
import { useLocation } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const { sex, born, died, fatherName, motherName, slug, mother, father } =
    person;

  const formatName = (
    personObject: Person | undefined,
    personName: string | null | undefined,
  ) => {
    if (personObject) {
      return <PersonLink person={personObject} />;
    }

    if (!personName) {
      return '-';
    }

    return personName;
  };

  const { pathname } = useLocation();
  const isPersonSelected = pathname === `/people/${slug}`;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isPersonSelected,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{formatName(mother, motherName)}</td>
      <td>{formatName(father, fatherName)}</td>
    </tr>
  );
};
