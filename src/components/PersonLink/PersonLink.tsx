import React from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = React.memo(({ person }) => {
  const {
    name, sex, born, died, slug,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  const { slug: SelectedSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': SelectedSlug === slug })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': sex === 'f' })}
          to={`/people/${slug}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link className="has-text-danger" to={`/people/${mother.slug}`}>
            {mother.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{father.name}</Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
});
