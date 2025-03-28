import React from 'react';
import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { Sex } from '../types/Sex';

type Props = {
  person: Person;
};

const PersonItem: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    slug,
    mother,
    father,
    fatherName = '',
    motherName = '',
  } = person;
  const { personName } = useParams();
  const [searchParams] = useSearchParams();
  const isSelected = personName && personName === slug;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelected })}
    >
      <td>
        <Link
          to={`../${slug}?${searchParams.toString()}`}
          className={classNames({ 'has-text-danger': sex === Sex.female })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother ? (
          <Link
            className="has-text-danger"
            to={`../${mother.slug}?${searchParams.toString()}`}
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <Link to={`../${father.slug}?${searchParams.toString()}`}>
            {fatherName}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};

export default PersonItem;
