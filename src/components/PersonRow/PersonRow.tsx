import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PersonName } from '../PersonName';

interface Props {
  person: Person

}

export const PersonRow: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (

    <tr
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td><PersonName person={person} /></td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        { person.mother
          ? <PersonName person={person.mother} />
          : <b>{person.motherName}</b>}
      </td>
      <td>
        { person.father
          ? <PersonName person={person.father} />
          : <b>{person.motherName}</b>}
      </td>
    </tr>
  );
};
