import React from 'react';
import { Person } from '../types';
import cn from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();
  const selectedPersonSlug = slug;
  const [searchParams] = useSearchParams();

  // визначили чи є мати/батько в списку people
  const mother = people.find(p => p.name === person.motherName);
  const father = people.find(p => p.name === person.fatherName);

  // визначили чи взагалі є мати/батько в обʼєкті person
  const hasMother = Boolean(person.motherName);
  const hasFather = Boolean(person.fatherName);

  return (
    <tr
      data-cy="person"
      className={cn(
        person.slug === selectedPersonSlug && 'has-background-warning',
      )}
    >
      <td>
        <Link
          className={cn(person.sex === 'f' && 'has-text-danger')}
          to={{
            pathname: `/people/${person.slug}`,
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
        {!hasMother ? (
          '-'
        ) : mother ? (
          <Link
            to={{
              pathname: `/people/${mother.slug}`,
              search: searchParams.toString(),
            }}
            className={cn(mother.sex === 'f' && 'has-text-danger')}
          >
            {person.motherName}
          </Link>
        ) : (
          <span>{person.motherName}</span>
        )}
      </td>
      <td>
        {!hasFather ? (
          '-'
        ) : father ? (
          <Link
            to={{
              pathname: `/people/${father.slug}`,
              search: searchParams.toString(),
            }}
            className={cn(father.sex === 'f' && 'has-text-danger')}
          >
            {person.fatherName}
          </Link>
        ) : (
          <span>{person.fatherName}</span>
        )}
      </td>
    </tr>
  );
};
