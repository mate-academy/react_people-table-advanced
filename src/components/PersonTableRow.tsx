import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PeopleLink } from './PeopleLink';

type Props = {
  person: Person
};

export const PersonTableRow: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === person.slug,
      })}
    >
      <td>
        <PeopleLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother
          ? <PeopleLink person={person.mother} />
          : person.motherName || '-'}
      </td>
      <td>
        {person.father
          ? <PeopleLink person={person.father} />
          : person.fatherName || '-'}
      </td>
    </tr>
  );
};
