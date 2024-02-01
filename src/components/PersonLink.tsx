import React from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

interface Props {
  people: Person[],
  person: Person,
}

export const PersonLink: React.FC<Props> = ({ people, person }) => {
  const { slug } = useParams();

  const hasMother = (currPerson: Person) => {
    return people.some(mom => mom.name === currPerson.motherName);
  };

  const hasFather = (currPerson: Person) => {
    return people.some(dad => dad.name === currPerson.fatherName);
  };

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName && hasMother(person)
          ? (
            <Link
              to={`/people/${person.mother?.slug}`}
              className={cn({
                'has-text-danger': true,
              })}
            >
              {person.mother?.name}
            </Link>
          ) : person.motherName || '-'}
      </td>

      <td>
        {hasFather(person) && person.fatherName
          ? (
            <Link to={`/people/${person.father?.slug}`}>
              {person.father?.name}
            </Link>
          )
          : person.fatherName || '-'}
      </td>
    </tr>
  );
};
