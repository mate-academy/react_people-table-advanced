import React from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  slug: string | undefined;
};

export const PersonItem: React.FC<Props> = ({ person, slug }) => {
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString(),
          }}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>

      <td>{person.born}</td>

      <td>{person.died}</td>

      <td>
        {person.mother ? (
          <Link
            to={`../people/${person.mother.slug}`}
            className="has-text-danger"
          >
            {person.mother.name}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>

      <td>
        {person.father ? (
          <Link
            to={`../people/${person.father.slug}`}
          >
            {person.father.name}
          </Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
