import React from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  name: string;
  sex: string;
  born: number;
  died: number;
  mother: string | null;
  father: string | null;
  slug: string;
  nameColor: (name: string | null) => string | undefined;
  findSlug: (parentName: string | null) => string | undefined;
}

export const Person: React.FC<Props> = ({
  name,
  sex,
  born,
  died,
  mother,
  father,
  slug,
  nameColor,
  findSlug,
}) => {
  const location = useLocation();

  return (
    <tr
      data-cy="person"
      className={
        location.pathname.includes(slug) ? 'has-background-warning' : undefined
      }
    >
      <td>
        <a
          className={sex === 'f' ? 'has-text-danger' : undefined}
          href={`#/people/${slug}`}
        >
          {name}
        </a>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {nameColor(mother) ? (
        <td>
          <a
            className={
              nameColor(mother) === 'f' ? 'has-text-danger' : nameColor(mother)
            }
            href={`#/people/${findSlug(mother)}`}
          >
            {mother ? mother : '-'}
          </a>
        </td>
      ) : (
        <td>{mother ? mother : '-'}</td>
      )}

      {nameColor(father) ? (
        <td>
          <a
            className={nameColor(father) === 'm' ? '' : nameColor(father)}
            href={`#/people/${findSlug(father)}`}
          >
            {father ? father : '-'}
          </a>
        </td>
      ) : (
        <td>{father ? father : '-'}</td>
      )}
    </tr>
  );
};
