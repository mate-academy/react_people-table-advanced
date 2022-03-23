import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import PersonName from '../PersonName';

import './PersonRow.scss';

type Props = {
  person: Person
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams<{ personSlug: string }>();

  return (
    <tr className={classNames({ 'selected-person': personSlug === person.slug })}>
      <td>
        <PersonName person={person} />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother
          ? <PersonName person={person.mother} />
          : <b>{person.motherName}</b>}
      </td>
      <td>
        {person.father ? (
          <PersonName person={person.father} />
        ) : <b>{person.fatherName}</b>}
      </td>
    </tr>
  );
};
