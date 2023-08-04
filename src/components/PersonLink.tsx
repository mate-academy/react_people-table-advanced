import React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  const mother = people.find(human => (
    human.name === person.motherName
  ));

  const father = people.find(human => (
    human.name === person.fatherName
  ));

  const checkParentsObject = (
    name: string | null,
    parent: Person | undefined,
  ) => {
    if (!name) {
      return (
        <p>-</p>
      );
    }

    if (parent) {
      return (
        <Link
          to={`/people/${parent.slug}`}
          className={classNames({
            'has-text-danger': (parent.sex === 'f'),
          })}
        >
          {name}
        </Link>
      );
    }

    return (
      <p>
        {name}
      </p>
    );
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': (person.slug === slug),
      })}
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': (person.sex === 'f'),
          })}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>

      <td>{person.born}</td>

      <td>{person.died}</td>

      <td>
        {checkParentsObject(person.motherName, mother)}
      </td>

      <td>
        {checkParentsObject(person.fatherName, father)}
      </td>
    </tr>
  );
};
