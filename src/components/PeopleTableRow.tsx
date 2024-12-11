import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';
import { findPersonByName } from '../utils/findPersonByName';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
};

export const PeopleTableRow: React.FC<Props> = ({ person, people }) => {
  const { personSlug } = useParams();
  const { fatherName, motherName, sex, born, died, slug } = person;
  const personFather = findPersonByName(fatherName, people);
  const personMother = findPersonByName(motherName, people);

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': personSlug === slug })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {personMother ? (
          <PersonLink person={personMother} />
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {personFather ? (
          <PersonLink person={personFather} />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
