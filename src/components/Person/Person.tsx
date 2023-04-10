import React from 'react';
import classNames from 'classnames';
import { PersonType } from '../../types';

type Props = {
  person: PersonType;
  selectedPersonSlug: string;
  isMother: PersonType | null;
  isFather: PersonType | null;
};

export const Person: React.FC<Props> = ({
  person,
  selectedPersonSlug,
  isMother,
  isFather,
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
      key={slug}
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
        {isMother
          ? (
            <a
              href={`#/people/${isMother.slug}`}
              className="has-text-danger"
            >
              {isMother.name}
            </a>
          )
          : motherName || '-'}
      </td>

      <td>
        {isFather
          ? (
            <a
              href={`#/people/${isFather.slug}`}
            >
              {isFather.name}
            </a>
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
};
