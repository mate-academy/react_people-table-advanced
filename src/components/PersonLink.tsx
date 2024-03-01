import { Link, useParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();
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
          to={`/people/${person.slug}`}
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
            to={`/people/${isMotherInPeople.slug}`}
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
          <Link to={`/people/${isFatherInPeople.slug}`}>
            {person.fatherName}
          </Link>
        ) : (
          person?.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
