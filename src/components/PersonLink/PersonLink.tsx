import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types/Person';

type Props = {
  person: Person;
  getPersonByName: (personName: string | null) => Person | null;
};

export const PersonLink: React.FC<Props> = ({
  person: {
    slug,
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
  },
  getPersonByName,
}) => {
  const { personName } = useParams();
  const [searchParams] = useSearchParams();
  const motherInList = getPersonByName(motherName);
  const fatherInList = getPersonByName(fatherName);

  return (
    <tr
      data-cy="person"
      className={
        cn({ 'has-background-warning': slug === personName })
      }
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': sex === 'f' })}
          to={`/people/${slug}?${searchParams.toString()}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {getPersonByName(motherName)
        ? (
          <td>
            <Link
              className="has-text-danger"
              to={motherInList ? `/people/${motherInList.slug}?${searchParams.toString()}` : '#'}
            >
              {motherName}
            </Link>
          </td>
        )
        : (
          <td>{motherName || '-'}</td>
        )}

      {getPersonByName(fatherName)
        ? (
          <td>
            <Link
              to={fatherInList ? `/people/${fatherInList.slug}?${searchParams.toString()}` : '#'}
            >
              {fatherName}
            </Link>
          </td>
        )
        : (
          <td>{fatherName || '-'}</td>
        )}
    </tr>
  );
};
