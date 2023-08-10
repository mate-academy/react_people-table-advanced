import React, { useMemo } from 'react';
import classNames from 'classnames';

import { PersonLink } from './PersonLink';
import { Person } from '../types';

type Props = {
  person: Person;
  slug: string | undefined;
  people: Person[];
};

const findLinkedPerson = (name: string, table: Person[]) => {
  const foundPerson = table.find(person => person.name === name);

  return foundPerson
    ? <PersonLink person={foundPerson} />
    : name;
};

export const PeopleRow: React.FC<Props> = ({ person, slug, people }) => {
  const linkedMother = useMemo(
    () => findLinkedPerson(person.motherName || '', people), [people],
  );

  const linkedFather = useMemo(
    () => findLinkedPerson(person.fatherName || '', people), [people],
  );

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {
          person.motherName
            ? linkedMother
            : '-'
        }
      </td>
      <td>
        {
          person.fatherName
            ? linkedFather
            : '-'
        }
      </td>
    </tr>
  );
};
