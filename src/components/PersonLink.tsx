import React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

const representParent = (
  parentName: string | null,
  parent: Person | undefined,
) => {
  if (!parentName) {
    return '-';
  }

  if (!parent) {
    return parentName;
  }

  return (
    <Link
      className={classNames({ 'has-text-danger': parent.sex === 'f' })}
      to={`../${parent.slug}`}
    >
      {parentName}
    </Link>
  );
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();

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
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <Link
          to={`../${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{representParent(motherName, mother)}</td>
      <td>{representParent(fatherName, father)}</td>
    </tr>
  );
};
