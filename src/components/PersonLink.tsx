import React from 'react';
import cn from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();
  // eslint-disable-next-line prettier/prettier
  const {
    died, born, name, sex, fatherName, motherName, father, mother,
  } = person;

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': sex === 'f' })}
          to={{
            pathname: `../${person.slug}`,
            search: searchParams.toString(),
          }}
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
            to={{
              pathname: `../${mother.slug}`,
              search: searchParams.toString(),
            }}
          >
            {motherName}
          </Link>
        ) : (
          `${motherName ?? '-'}`
        )}
      </td>

      <td>
        {father ? (
          <Link
            to={{
              pathname: `../${father.slug}`,
              search: searchParams.toString(),
            }}
          >
            {fatherName}
          </Link>
        ) : (
          `${fatherName ?? '-'}`
        )}
      </td>
    </tr>
  );
};
