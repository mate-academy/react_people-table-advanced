import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonCard: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  const mother = people.find((p) => p.name === person.motherName);
  const father = people.find((p) => p.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={
        classNames({
          'has-background-warning': person.slug === slug,
        })
      }
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>
        {person.sex}
      </td>

      <td>{ person.born}</td>
      <td>{person.died}</td>

      {mother
        ? (
          <td>
            <PersonLink person={mother} />
          </td>
        )
        : <td>{person.motherName ?? '-'}</td>}

      {father
        ? (
          <td>
            <PersonLink person={father} />
          </td>
        )
        : <td>{person.fatherName ?? '-'}</td>}
    </tr>
  );
};
