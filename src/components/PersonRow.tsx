import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
  isSelected: boolean;
};

export const PersonRow: React.FC<Props> = ({ person, people, isSelected }) => {
  const mother = people.find(p => p.name === person.motherName);
  const father = people.find(p => p.name === person.fatherName);

  const isFemale = person.sex === 'f';

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <PersonLink
          personSlug={person.slug}
          className={isFemale ? 'has-text-danger' : ''}
        >
          {person.name}
        </PersonLink>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died ?? '-'}</td>

      <td>
        {mother ? (
          <PersonLink personSlug={mother.slug} className="has-text-danger">
            {mother.name}
          </PersonLink>
        ) : (
          person.motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <PersonLink personSlug={father.slug}>{father.name}</PersonLink>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
