import React from 'react';
import { Person as PersonInterface } from '../types';
import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  data: PersonInterface;
  param: string | undefined;
};

export const Person: React.FC<Props> = ({ data, param }) => {
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
  } = data;
  const isFather = fatherName ? fatherName : '-';
  const isMother = motherName ? motherName : '-';
  const isWomenName = sex === 'f' ? 'has-text-danger' : '';

  // Get current search parameters
  const [searchParams] = useSearchParams();
  const currentSearch = searchParams.toString(); // Convert params to string

  // Construct URL with current search parameters preserved
  const buildPath = (slug: string) => {
    return currentSearch ? `/people/${slug}?${currentSearch}` : `/people/${slug}`;
  };

  return (
    <tr
      data-cy="person"
      className={slug === param ? 'has-background-warning' : ''}
    >
      <td>
        <Link className={isWomenName} to={buildPath(slug)}>
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother?.slug ? (
          <Link className="has-text-danger" to={buildPath(mother.slug)}>
            {isMother}
          </Link>
        ) : (
          isMother
        )}
      </td>
      <td>
        {father?.slug ? (
          <Link to={buildPath(father.slug)}>{isFather}</Link>
        ) : (
          isFather
        )}
      </td>
    </tr>
  );
};
