import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  const { slug } = useParams();
  const { mother, father } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
          to={{
            pathname: `../${person.slug}`,
            search: searchParams.toString(),
          }}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {mother
          ? (
            <Link
              className="has-text-danger"
              to={{
                pathname: `../${mother.slug}`,
                search: searchParams.toString(),
              }}
            >
              {mother.name}
            </Link>
          )
          : (person.motherName || '-')}
      </td>

      <td>
        {father
          ? (
            <Link
              to={{
                pathname: `../${father.slug}`,
                search: searchParams.toString(),
              }}
            >
              {father.name}
            </Link>
          )
          : (person.fatherName || '-')}
      </td>

    </tr>
  );
};
