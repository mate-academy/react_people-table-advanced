import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  selectedPerson: string,
  findRelative: (name: string | null) => string | JSX.Element
};

export const PersonItem: React.FC<Props> = ({
  person,
  selectedPerson,
  findRelative,
}) => {
  const {
    name,
    sex,
    born,
    died,
    slug,
    motherName,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPerson === person.slug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{findRelative(motherName)}</td>
      <td>{findRelative(fatherName)}</td>
    </tr>
  );
};
