import React from 'react';
import classNames from 'classnames';
import { useParams, Link } from 'react-router-dom';
import { Person } from '../types';

const findParent = (
  person: Person,
  parentType: string,
  name: string,
  peopleList: Person[],
) => {
  const parent = peopleList
    .find(personToFind => personToFind.name === name);

  if (parent) {
    return (
      <Link
        className={classNames(
          { 'has-text-danger': parentType === 'mother' },
        )}
        to={`/people/${parent.slug}`}
      >
        {parentType === 'mother'
          ? person.motherName
          : person.fatherName}
      </Link>
    );
  }

  return `${name}`;
};

interface Props {
  person: Person,
  people: Person[],
}

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning':
          person.slug === slug,
      })}
    >
      <td>
        <Link
          className={classNames(
            { 'has-text-danger': person.sex === 'f' },
          )}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName
          ? (
            findParent(person, 'mother', person.motherName, people)
          )
          : ('-')}
      </td>
      <td>
        {person.fatherName
          ? (
            findParent(person, 'father', person.fatherName, people)
          )
          : ('-')}
      </td>
    </tr>
  );
};
