import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const location = useLocation();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <Link
          to={`../${person.slug}`}
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
            to={{
              pathname: `/people/${person.mother.slug}`,
              search: location.search,
            }}
            className={classNames({
              'has-text-danger': person.mother.sex === 'f',
            })}
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
            to={{
              pathname: `/people/${person.father.slug}`,
              search: location.search,
            }}
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
