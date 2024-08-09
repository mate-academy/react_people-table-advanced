import React from 'react';
import classNames from 'classnames';

import { AboutPerson, Person, Constans } from '../../types';

import { PersonLink } from '..';
import { useParams } from 'react-router-dom';

interface PersonRowProps {
  person: Person;
}

export const PersonRow: React.FC<PersonRowProps> = ({ person }) => {
  const { name, sex, born, died, fatherName, motherName, father, mother } =
    person;

  const { slug } = useParams();

  return (
    <tr
      key={person.slug}
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <PersonLink
          person={person}
          className={classNames({
            'has-text-danger': sex === AboutPerson.FEMALE,
          })}
        >
          {name}
        </PersonLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother ? (
          <PersonLink className="has-text-danger" person={mother}>
            {motherName}
          </PersonLink>
        ) : (
          motherName || Constans.HYPHEN
        )}
      </td>

      <td>
        {father ? (
          <PersonLink person={father}>{fatherName}</PersonLink>
        ) : (
          fatherName || Constans.HYPHEN
        )}
      </td>
    </tr>
  );
};
