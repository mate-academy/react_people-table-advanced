import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const { name, sex, born, died, motherName, fatherName } = person;

  const link = [...name.toLowerCase().split(' '), born].join('-');
  const { personData } = useParams<{ personData: string }>();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': personData === link })}
    >
      <td>
        <PersonLink name={name} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName ? <PersonLink name={motherName} /> : '-'}</td>
      <td>{fatherName ? <PersonLink name={fatherName} /> : '-'}</td>
    </tr>
  );
};
