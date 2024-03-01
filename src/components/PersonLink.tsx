import { Link, useParams, useSearchParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const isMotherInPeople = people.find(p => p.name === person.motherName);
  const isFatherInPeople = people.find(p => p.name === person.fatherName);

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
        {isMotherInPeople ? (
          <Link
            to={{
              pathname: `/people/${isMotherInPeople.slug}`,
              search: searchParams.toString(),
            }}
            className={classNames({
              'has-text-danger': isMotherInPeople.sex === 'f',
            })}
          >
            {person.motherName}
          </Link>
        ) : (
          person?.motherName || '-'
        )}
      </td>

      <td>
        {isFatherInPeople ? (
          <Link
            to={{
              pathname: `/people/${isFatherInPeople.slug}`,
              search: searchParams.toString(),
            }}
          >
            {person.fatherName}
          </Link>
        ) : (
          person?.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
