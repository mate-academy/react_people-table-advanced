import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import React from 'react';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
};

export const PeopleTableRow: React.FC<Props> = React.memo(({ person }) => {
  const { slug: selectedSlug } = useParams();
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
      className={slug === selectedSlug ? 'has-background-warning' : ''}
    >
      <td>
        <PersonLink
          name={name}
          path={`../${slug}`}
          highlightAsFemale={sex === 'f'}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        <PersonLink
          name={motherName}
          path={mother ? `../${mother.slug}` : null}
          highlightAsFemale={!!motherName}
        />
      </td>

      <td>
        <PersonLink
          name={fatherName}
          path={father ? `../${father.slug}` : null}
          highlightAsFemale={false}
        />
      </td>
    </tr>
  );
});

PeopleTableRow.displayName = 'PeopleTableRow';
