import cn from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person,
  mother: Person | null,
  father: Person | null,
};

export const PersonItem: React.FC<Props> = ({ person, mother, father }) => {
  const { selectedUser } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': person.slug === selectedUser,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother
          ? (<PersonLink person={mother} />)
          : (person.motherName || '-')}
      </td>
      <td>
        {father
          ? (<PersonLink person={father} />)
          : (person.fatherName || '-')}
      </td>
    </tr>
  );
};
