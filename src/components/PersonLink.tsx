import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';
import { Person } from '../types';

type Props = {
  person: Person;
  mother: Person | null;
  father: Person | null;
};

export const PersonLink: React.FC<Props> = ({ person, mother, father }) => {
  const { slug } = useParams();
  const { search } = useLocation();

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link
          to={{ pathname: `/people/${person.slug}`, search }}
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
        {mother ? (
          <Link
            to={{ pathname: `/people/${mother.slug}`, search }}
            className="has-text-danger"
          >
            {mother.name}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={{ pathname: `/people/${father.slug}`, search }}>
            {father.name}
          </Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
