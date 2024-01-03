import { useParams } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn(
        { 'has-background-warning': slug === person.slug },
      )}
    >
      <td aria-label="Person">
        <PersonLink person={person} />
      </td>

      <td aria-label="Sex">{sex}</td>
      <td aria-label="Born">{born}</td>
      <td aria-label="Died">{died}</td>
      <td aria-label="Mother">
        {(mother)
          ? (<PersonLink person={mother} />)
          : (motherName || '-')}
      </td>
      <td aria-label="Father">
        {(father)
          ? (<PersonLink person={father} />)
          : (fatherName || '-')}
      </td>
    </tr>
  );
};
