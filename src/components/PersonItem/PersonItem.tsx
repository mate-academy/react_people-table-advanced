import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PresonLink } from './PresonLink';

type Props = {
  person: Person;
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const { paramSlug } = useParams();
  const isSelected = paramSlug === person.slug;

  const selectedClass = classNames({
    'has-background-warning': isSelected,
  });

  const mother = person.mother ? (
    <PresonLink person={person.mother}>{person.mother.name}</PresonLink>
  ) : (
    person.motherName
  );

  const father = person.father ? (
    <PresonLink person={person.father}>{person.father.name}</PresonLink>
  ) : (
    person.fatherName
  );

  return (
    <tr data-cy="person" className={selectedClass}>
      <td>
        <PresonLink person={person}>{person.name}</PresonLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{mother || '-'}</td>
      <td>{father || '-'}</td>
    </tr>
  );
};
