import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

type PeopleInfoProps = {
  people: Person[];
};

export const PersonInfo: React.FC<PeopleInfoProps> = ({ people }) => {
  const { slug } = useParams();

  return (
    <tbody>
      {people.map(person => (
        <tr
          data-cy="person"
          key={person.slug}
          className={classNames({
            'has-background-warning': person.slug === slug,
          })}
        >
          <td>
            <PersonLink person={person} />
          </td>

          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>
            {person.mother ? (
              <PersonLink person={person.mother} />
            ) : (
              person.motherName || '-'
            )}
          </td>
          <td>
            {person.father ? (
              <PersonLink person={person.father} />
            ) : (
              person.fatherName || '-'
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};
