import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types/Person';

type Props = {
  person: Person;
};

export const PersonComponent: React.FC<Props> = ({ person }) => {
  const { personId } = useParams();
  const { slug, sex, born, died, motherName, fatherName, father, mother } =
    person;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': personId === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          <span>{motherName || '-'}</span>
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          <span>{fatherName || '-'}</span>
        )}
      </td>
    </tr>
  );
};
