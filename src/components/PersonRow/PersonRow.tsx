import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {!person.mother
          ? person.motherName || '-'
          : <PersonLink person={person.mother} />}
      </td>

      <td>
        {!person.father
          ? person.fatherName || '-'
          : <PersonLink person={person.father} />}
      </td>
    </tr>
  );
};
