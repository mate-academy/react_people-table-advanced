import React from 'react';
import { PersonType } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

interface Props {
  people: PersonType[];
  person: PersonType;
}

export const Person: React.FC<Props> = ({ people, person }) => {
  const { peopleSlug } = useParams();

  const getParent = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(man => man.name === parentName);

    if (!parent) {
      return parentName;
    }

    return <PersonLink person={parent} />;
  };

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': peopleSlug === person.slug })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{getParent(person.motherName)}</td>
      <td>{getParent(person.fatherName)}</td>
    </tr>
  );
};
