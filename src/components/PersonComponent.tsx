import React, { memo } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person,
}

export const PersonComponent: React.FC<Props> = memo(({
  person: {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
    slug,
  },
}) => {
  const { personSlug } = useParams();
  const isSelctedPerson = personSlug === slug;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelctedPerson })}
    >
      <td>
        <a
          href={`#/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
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
            <a href={`#/people/${father.slug}`}>
              {father.name}
            </a>
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
});
