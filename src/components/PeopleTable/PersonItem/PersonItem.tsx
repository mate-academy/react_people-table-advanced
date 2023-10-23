import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../../types/Person';

type PersonItemProps = {
  person: Person;
};

export const PersonItem: React.FC<PersonItemProps> = ({ person }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <Link
          to={`/people/${person.slug}?${searchParams.toString()}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {!person.mother
          ? (person.motherName || '-')
          : (
            <Link
              to={`/people/${person.mother?.slug}?${searchParams.toString()}`}
              className="has-text-danger"
            >
              {person.motherName}
            </Link>
          )}
      </td>
      <td>
        {!person.father
          ? (person.fatherName || '-')
          : (
            <Link
              to={`/people/${person.father?.slug}?${searchParams.toString()}`}
            >
              {person.fatherName}
            </Link>
          )}
      </td>
    </tr>
  );
};
