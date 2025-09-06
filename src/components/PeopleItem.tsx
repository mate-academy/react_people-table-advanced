import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PeopleLink } from './PeopleLink';

type Props = {
  people: Person[];
};

export const PeopleItem: React.FC<Props> = ({ people }) => {
  const currentSlug = useParams();

  return (
    <tbody>
      {people.map(person => {
        const motherName = person.motherName ? person.motherName : '-';
        const fatherName = person.fatherName ? person.fatherName : '-';

        const { slug, sex, born, died, mother, father } = person;

        return (
          <tr
            data-cy="person"
            key={slug}
            className={
              currentSlug.peopleId === slug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PeopleLink person={person} />
            </td>

            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>{mother ? <PeopleLink person={mother} /> : motherName}</td>
            <td>{father ? <PeopleLink person={father} /> : fatherName}</td>
          </tr>
        );
      })}
    </tbody>
  );
};
