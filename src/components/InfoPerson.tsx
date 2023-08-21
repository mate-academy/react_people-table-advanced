import React from 'react';

import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';

enum Gender {
  Female = 'f',
  Male = 'm',
}

type Props = {
  person: Person;
  ifPersonPind: (name: string | null) => Person | undefined;
};

export const InfoPerson: React.FC<Props> = ({ person, ifPersonPind }) => {
  const { personLink } = useParams();

  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  const getLinkText = (pName: string | null) => {
    const linkedPerson = ifPersonPind(pName);

    return linkedPerson ? linkedPerson.slug || '-' : '-';
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personLink === slug,
      })}
    >
      <td>
        <Link
          to={`/${slug}`}
          className={classNames({
            'has-text-danger': sex === Gender.Female,
          })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        <Link
          className="has-text-danger"
          to={`/${getLinkText(motherName)}`}
        >
          {motherName || '-'}
        </Link>
      </td>
      <td>
        <Link
          className="has-text-danger"
          to={`/${getLinkText(fatherName)}`}
        >
          {fatherName || '-'}
        </Link>
      </td>
    </tr>
  );
};
