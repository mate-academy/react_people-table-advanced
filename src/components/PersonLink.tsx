import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  people: Person[];
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ people, person }) => {
  const { slug } = useParams();

  const mother = people.find(human => human.name === person.motherName);
  const father = people.find(human => human.name === person.fatherName);

  const cheackParent = (
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
        <a
          href={`#/people/${parent.slug}`}
          className={classNames({
            'has-text-danger': (person.sex === 'f'),
          })}
        >
          {name}
        </a>
      );
    }

    return (
      <p>{name}</p>
    );
  };

  return (
    <tr
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
      data-cy="person"
    >
      <td>
        <a
          className={classNames({
            'has-text-danger': (person.sex === 'f'),
          })}
          href={`#/people/${person.slug}`}
        >
          {person.name}
        </a>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{cheackParent(person.motherName, mother)}</td>
      <td>{cheackParent(person.fatherName, father)}</td>
    </tr>

  );
};
