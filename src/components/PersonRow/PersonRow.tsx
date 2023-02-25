import React from 'react';
import classNames from 'classnames';

import { PersonLink } from '../PersonLink';

import { Person } from '../../types/Person';

type Props = {
  person: Person;
  selectedSlug: string;
};

export const PersonRow: React.FC<Props> = React.memo(
  ({ person, selectedSlug }) => {
    const {
      name,
      sex,
      born,
      died,
      fatherName,
      motherName,
      slug,
      mother,
      father,
    } = person;

    return (
      <tr
        data-cy="person"
        className={classNames({
          'has-background-warning': slug === selectedSlug,
        })}
      >
        <td>
          <PersonLink
            name={name}
            sex={sex}
            slug={slug}
          />
        </td>

        <td>{sex}</td>

        <td>{born}</td>

        <td>{died}</td>

        <td>
          {!motherName && '-'}

          {mother ? (
            <PersonLink
              name={mother.name}
              sex={mother.sex}
              slug={mother.slug}
            />
          ) : (
            motherName
          )}
        </td>

        <td>
          {!fatherName && '-'}

          {father ? (
            <PersonLink
              name={father.name}
              sex={father.sex}
              slug={father.slug}
            />
          ) : (
            fatherName
          )}
        </td>
      </tr>
    );
  },
);
