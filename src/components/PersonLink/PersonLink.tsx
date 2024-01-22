/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person
  className: string
  motherBirth: number | null
  fatherBirth: number | null
}

const getLinkClass = (sex: string) => classNames(
  { 'has-text-danger': sex === 'f' },
);

const getLinkString = (name: string, born: number) => {
  return `#/people/${name.toLocaleLowerCase().replaceAll(' ', '-')}-${born}`;
};

export const PersonLink: React.FC<Props> = (props) => {
  const {
    person, className, motherBirth, fatherBirth,
  } = props;

  const displayMotherName = person.motherName || '-';
  const displayFatherName = person.fatherName || '-';

  return (
    <tr data-cy="person" className={className}>
      <td>
        <a
          className={getLinkClass(person.sex)}
          href={getLinkString(person.name, person.born)}
        >
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {
          person.motherName !== null && motherBirth !== null
            ? (
              <a
                className="has-text-danger"
                href={getLinkString(person.motherName, motherBirth)}
              >
                {person.motherName}
              </a>
            ) : (
              <>{displayMotherName}</>
            )
        }
      </td>
      <td>
        {
          person.fatherName !== null && fatherBirth !== null
            ? (
              <a
                href={getLinkString(person.fatherName, fatherBirth)}
              >
                {person.fatherName}
              </a>
            ) : (
              <>{displayFatherName}</>
            )
        }
      </td>
    </tr>
  );
};
