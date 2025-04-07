import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonComponent: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  const findMother = () => {
    const mother = people.find(item => item.name === person.motherName);

    if (mother) {
      return <PersonLink person={mother} />;
    }

    if (person.motherName) {
      return person.motherName;
    }

    return '-';
  };

  const findFather = () => {
    const father = people.find(item => item.name === person.fatherName);

    if (father) {
      return <PersonLink person={father} />;
    }

    if (person.fatherName) {
      return person.fatherName;
    }

    return '-';
  };

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>{findMother()}</td>

      <td>{findFather()}</td>
    </tr>
  );
};
