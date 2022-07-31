import React from 'react';

import { useParams } from 'react-router';

import classNames from 'classnames';

import PersonName from './PersonName';

type Props = {
  person: Person;
  index: number;
};

const PersonRow: React.FC<Props> = ({ person, index }) => {
  const { personSlug } = useParams();

  return (
    <tr
      className={classNames({
        'table-info': personSlug === person.slug,
      })}
    >
      <th scope="row">{index}</th>
      <td><PersonName person={person} /></td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother
          ? (
            <PersonName person={person.mother} />
          )
          : (
            <span className="person__unknown">{person.motherName}</span>
          )}
      </td>
      <td>
        {person.father
          ? (
            <PersonName person={person.father} />
          )
          : (
            <span className="person__unknown">{person.fatherName}</span>
          )}
      </td>
    </tr>
  );
};

export default React.memo(PersonRow);
