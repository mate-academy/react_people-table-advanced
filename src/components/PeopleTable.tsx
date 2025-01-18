import React, { useMemo } from 'react';

import { Person } from '../types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  person: Person;
  slug: string | undefined;
  isParentInList: (parentName: string | null) => Person | undefined;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({
  person,
  slug,
  isParentInList,
}) => {
  const {
    name: fullName,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug: personSlug,
  } = person;

  const isMotherInList = useMemo(
    () => isParentInList(motherName),
    [motherName],
  );
  const isFatherInList = useMemo(
    () => isParentInList(fatherName),
    [fatherName],
  );

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': personSlug === slug })}
    >
      <td>
        <Link
          to={`/people/${personSlug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {fullName}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {isMotherInList ? (
          <Link
            to={`/people/${isMotherInList.slug}`}
            className="has-text-danger"
          >
            {motherName}
          </Link>
        ) : motherName ? (
          motherName
        ) : (
          '-'
        )}
      </td>
      <td>
        {isFatherInList ? (
          <Link to={`/people/${isFatherInList.slug}`}>{fatherName}</Link>
        ) : fatherName ? (
          fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
