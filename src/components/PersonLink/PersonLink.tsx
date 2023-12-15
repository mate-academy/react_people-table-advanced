import React from 'react';
import classNames from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
  peopleAll: Person[],
};

export const PersonLink: React.FC<Props> = ({ person, peopleAll }) => {
  const listName = peopleAll.map(human => human.name);
  const { search } = useLocation();

  const { personSlug } = useParams();

  const getSlug = (personName: string) => {
    const man = peopleAll.find(human => human.name === personName);

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
          to={{ pathname: `../${person.slug}`, search }}
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
              to={{ pathname: `../${getSlug(person.motherName)}`, search }}
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
              to={{ pathname: `../${getSlug(person.fatherName)}`, search }}
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
