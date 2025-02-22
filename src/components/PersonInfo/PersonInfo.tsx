import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonInfo: React.FC<Props> = ({ person, people }) => {
  const {
    slug: personSlug,
    sex,
    born,
    died,
    fatherName,
    motherName,
    father = people.find(candidate => candidate.name === fatherName),
    mother = people.find(candidate => candidate.name === motherName),
  } = person;
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === personSlug })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother} /> : motherName || '-'}</td>
      <td>{father ? <PersonLink person={father} /> : fatherName || '-'}</td>
    </tr>
  );
};
