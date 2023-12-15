import React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
  people: Person[],
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const listName = people.map(human => human.name);

  const { personSlug } = useParams();

  const getSlug = (personName: string) => {
    const man = people.find(human => human.name === personName);

    return man?.slug;
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === person.slug,
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
        {
          person.motherName && listName.includes(person.motherName) ? (
            <Link
              to={`../${getSlug(person.motherName)}`}
              className="has-text-danger"
            >
              {person.motherName}
            </Link>
          ) : (
            person.motherName || '-'
          )
        }
      </td>
      <td>
        {
          person.fatherName && listName.includes(person.fatherName) ? (
            <Link
              to={`../${getSlug(person.fatherName)}`}
            >
              {person.fatherName}
            </Link>
          ) : (
            person.fatherName || '-'
          )
        }
      </td>
    </tr>
  );
};
