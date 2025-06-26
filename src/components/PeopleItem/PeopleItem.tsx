import React, { useContext } from 'react';
import { Person } from '../../types';
import { PeopleContext } from '../../context/PeopleContext';
import { PersonLink } from '../PeopleLink';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  person: Person;
}

export const PeopleItem: React.FC<Props> = ({ person }) => {
  const { sex, born, died, motherName, fatherName, slug } = person;
  const { people } = useContext(PeopleContext);
  const { personSlug } = useParams();
  const selectedPersonSlug = personSlug;

  const mother = person.motherName
    ? people?.find(per => per.name === person.motherName)
    : undefined;

  const father = person.fatherName
    ? people?.find(per => per.name === person.fatherName)
    : undefined;

  const motherElement = mother ? (
    <PersonLink person={mother} />
  ) : (
    motherName || '-'
  );

  const fatherElement = father ? (
    <PersonLink person={father} />
  ) : (
    fatherName || '-'
  );

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': selectedPersonSlug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherElement}</td>
      <td>{fatherElement}</td>
    </tr>
  );
};
