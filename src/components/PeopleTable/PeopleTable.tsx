import React from 'react';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  const findPerson = (name: string) => {
    const person = people.find(obj => obj.name === name);

    return person ? <PersonLink person={person} /> : name;
  };

  const setPersonClassName = (slug: string) => {
    return slug === personSlug ? 'has-background-warning' : '';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={setPersonClassName(person.slug)}
          >
            <td>{findPerson(person.name)}</td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{person.motherName ? findPerson(person.motherName) : '-'}</td>
            <td>{person.fatherName ? findPerson(person.fatherName) : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
