import React from 'react';
import { useParams } from 'react-router-dom';

import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  const { sex, born, died, motherName, fatherName, mother, father } = person;

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother && motherName ? (
          <PersonLink person={mother} />
        ) : (
          <p>{motherName || '-'}</p>
        )}
      </td>

      <td>
        {father && fatherName ? (
          <PersonLink person={father} />
        ) : (
          <p>{fatherName || '-'}</p>
        )}
      </td>
    </tr>
  );
};
