import { useParams } from 'react-router-dom';
import React from 'react';
import { PersonName } from './PersonName';
import { Man } from '../types';
import './PersonRow.scss';

type Props = {
  person: Man,
  people: Man[],
};

export const PersonRow: React.FC<Props> = React.memo(({ person, people }) => {
  const { slug } = useParams();
  const father = people.find(vater => vater.name === person.fatherName);
  const mother = people.find(mutter => mutter.name === person.motherName);

  return (
    <tr className={`Person ${person.slug === slug ? 'Person__light' : ''}`}>
      <td><PersonName person={person} /></td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {father
          ? (<PersonName person={father} />)
          : (person.fatherName || 'unknown')}
      </td>
      <td>
        {mother
          ? (<PersonName person={mother} />)
          : (person.motherName || 'unknown')}
      </td>
    </tr>
  );
});
