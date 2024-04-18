import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
};

const PersonItem: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const { sex, born, died, motherName, fatherName, mother, father } = person;
  const selected = slug === person.slug;

  return (
    <tr data-cy="person" className={cn({ 'has-background-warning': selected })}>
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

export default PersonItem;
