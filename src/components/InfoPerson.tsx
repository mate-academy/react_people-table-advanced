import React from 'react';

import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';

type Props = {
  person: Person,
  ifPersonPind: (name: string | null) => Person | undefined,
};

export const InfoPerson: React.FC<Props> = ({ person, ifPersonPind }) => {
  const { personLink } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personLink === person.slug,
      })}
    >
      <td>
        <Link
          to={`${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {person.motherName
            && ifPersonPind(person.motherName)
          ? (
            <Link
              className="has-text-danger"
              to={`${
                ifPersonPind(person.motherName)?.slug || ''
              }`}
            >
              {person.motherName}
            </Link>
          ) : (
            <Link
              className="has-text-danger"
              to={`${
                ifPersonPind(person.motherName)?.slug || ''
              }`}
            >
              -
            </Link>
          )}
      </td>

      <td>
        {person.fatherName
            && ifPersonPind(person.fatherName)
          ? (
            <Link
              className="has-text-danger"
              to={`${
                ifPersonPind(person.fatherName)?.slug || ''
              }`}
            >
              {person.fatherName}
            </Link>
          ) : (
            <Link
              className="has-text-danger"
              to={`${
                ifPersonPind(person.fatherName)?.slug || ''
              }`}
            >
              -
            </Link>
          )}
      </td>
    </tr>
  );
};
