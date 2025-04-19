import React from 'react';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
type Props = {
  person: Person;
  selectedSlug: string;
  nameToSlugMap: Map<string, string>;
};
export const PersonLink: React.FC<Props> = ({
  person,
  selectedSlug,
  nameToSlugMap,
}) => {
  const [searchParams] = useSearchParams();
  const { name, slug, sex, born, died, fatherName, motherName } = person;

  const motherSlug = motherName && nameToSlugMap.get(motherName);
  const fatherSlug = fatherName && nameToSlugMap.get(fatherName);

  return (
    <tr
      data-cy="person"
      className={selectedSlug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: searchParams.toString(),
          }}
          className={sex === 'f' ? 'has-text-danger' : ''}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherSlug ? (
          <a href={`#/people/${motherSlug}`} className="has-text-danger">
            {motherName}
          </a>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {fatherSlug ? (
          <a href={`#/people/${fatherSlug}`}>{fatherName}</a>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
