import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonName } from '../PersonName/PersonName';
import { Person } from '../../../types/Person';

import './PeopleRow.scss';

interface Props {
  person: Person;
  people: Person[];
  isSorted: string | undefined,
}

export const PeopleRow: React.FC<Props> = ({ person, people, isSorted }) => {
  const params = useParams();

  const mother = people.find(element => element.name === person.motherName) || null;
  const father = people.find(element => element.name === person.fatherName) || null;

  return (
    <tr
      className={
        classNames('person-row', { 'person--active': person.slug === `${params['*']}` })
      }
    >
      <td
        className={
          classNames({ sorted: isSorted === 'Name' })
        }
      >
        <PersonName person={person} />
      </td>
      <td
        className={
          classNames({ sorted: isSorted === 'Sex' })
        }
      >
        {person.sex}
      </td>
      <td
        className={
          classNames({ sorted: isSorted === 'Born' })
        }
      >
        {person.born}
      </td>
      <td
        className={
          classNames({ sorted: isSorted === 'Died' })
        }
      >
        {person.died}
      </td>
      <td>
        {mother
          ? (<PersonName person={mother} />)
          : (person.motherName || <span>no record</span>)}
      </td>
      <td>
        {father
          ? (<PersonName person={father} />)
          : (person.fatherName || <span>no record</span>)}
      </td>
    </tr>
  );
};
