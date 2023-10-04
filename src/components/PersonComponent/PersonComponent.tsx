import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { EMPTY_PERSON } from '../../utils/variablesHelpers';

interface Props {
  person: Person
}

export const PersonComponent: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn({
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
        {person.mother
          ? <PersonLink person={person.mother} />
          : person.motherName || EMPTY_PERSON}
      </td>
      <td>
        {person.father
          ? <PersonLink person={person.father} />
          : person.fatherName || EMPTY_PERSON}
      </td>
    </tr>
  );
};
