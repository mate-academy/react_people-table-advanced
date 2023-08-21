import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { Sex } from '../types/Sex';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({
  person,
}) => {
  const {
    slug, sex, name, born, died, mother, father, motherName, fatherName,
  } = person;

  const { slug: slugValue } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slugValue === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === Sex.Female,
          })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {motherName && !mother && (
        <td>
          {motherName}
        </td>
      )}
      {mother && (
        <td>
          <Link
            className="has-text-danger"
            to={`/people/${mother.slug}`}
          >
            {mother.name}
          </Link>
        </td>
      )}
      {!motherName && (
        <td>
          -
        </td>
      )}
      {fatherName && !father && (
        <td>
          {fatherName}
        </td>
      )}
      {father && (
        <td>
          <Link
            to={`/people/${father.slug}`}
          >
            {father.name}
          </Link>
        </td>
      )}
      {!fatherName && (
        <td>
          -
        </td>
      )}
    </tr>
  );
};
