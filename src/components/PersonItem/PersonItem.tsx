import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonItem: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  const getPersonByName = (motherName: string | null) => {
    return people.find(p => p.name === motherName);
  };

  const personMother = getPersonByName(person.motherName);
  const personFather = getPersonByName(person.fatherName);

  return (
    <tr
      className={classNames({ 'has-background-warning': slug === person.slug })}
      data-cy="person"
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? (
          personMother ? (
            <PersonLink person={personMother} />
          ) : (
            person.motherName
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName ? (
          personFather ? (
            <PersonLink person={personFather} />
          ) : (
            person.fatherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
