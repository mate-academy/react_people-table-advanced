import React from 'react';
import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

const representParent = (
  parentName: string | null,
  parent: Person | undefined,
  searchParams: URLSearchParams,
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
      to={{
        pathname: `../${parent.slug}`,
        search: searchParams.toString(),
      }}
    >
      {parentName}
    </Link>
  );
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

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
          to={{
            pathname: `../${slug}`,
            search: searchParams.toString(),
          }}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{representParent(motherName, mother, searchParams)}</td>
      <td>{representParent(fatherName, father, searchParams)}</td>
    </tr>
  );
};
