import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
  selectedPersonSlug: string;
  mother: Person | null;
  father: Person | null;
};

export const PersonData: React.FC<Props> = ({
  person,
  selectedPersonSlug,
  mother,
  father,
}) => {
  const {
    name,
    slug,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames(
        {
          'has-background-warning': selectedPersonSlug === slug,
        },
      )}
    >
      <td>
        <a
          href={`#/people/${slug}`}
          className={classNames(
            { 'has-text-danger': sex === 'f' },
          )}
        >
          {name}
        </a>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <a
              href={`#/people/${mother.slug}`}
              className="has-text-danger"
            >
              {mother.name}
            </a>
          )
          : motherName || '-'}
      </td>

      <td>
        {father
          ? (
            <a
              href={`#/people/${father.slug}`}
            >
              {father.name}
            </a>
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
};
