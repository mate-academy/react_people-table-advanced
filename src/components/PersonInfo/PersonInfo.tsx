import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import cn from 'classnames';

interface Props {
  person: Person;
  isActive: boolean;
}

export const PersonInfo: React.FC<Props> = ({ person, isActive }) => {
  const isPersonFemale = person.sex === 'f';

  return (
    <tr data-cy="person" className={cn({ 'has-background-warning': isActive })}>
      <td>
        <PersonLink
          name={person.name}
          slug={person.slug}
          isFemale={isPersonFemale}
        />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <PersonLink
            name={person.mother.name}
            slug={person.mother.slug}
            isFemale={true}
          />
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {person.father ? (
          <PersonLink
            name={person.father.name}
            slug={person.father.slug}
            isFemale={false}
          />
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
