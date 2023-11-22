import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
    slug,
  } = person;

  const { peopleSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': peopleSlug === slug })}
    >
      <td>
        <PersonLink
          name={name}
          slug={slug}
          isActive={sex === 'f'}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink
            name={mother.name}
            slug={mother.slug}
            isActive={mother.sex === 'f'}
          />
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <PersonLink
            name={father.name}
            slug={father.slug}
            isActive={father.sex === 'f'}
          />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
