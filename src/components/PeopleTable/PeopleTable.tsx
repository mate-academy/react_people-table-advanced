import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  person: Person;
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  const currentPersonSlug = slug ? slug : '';
  const personMother = people.find(mother => person.motherName === mother.name);
  const personFather = people.find(father => person.fatherName === father.name);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === currentPersonSlug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {personMother ? (
          <PersonLink person={personMother} />
        ) : (
          person.motherName || '-'
        )}
      </td>

      <td>
        {personFather ? (
          <PersonLink person={personFather} />
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
