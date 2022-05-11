import classNames from 'classnames';
import React from 'react';

import { PersonName } from './PersonName';

type Props = {
  person: Person;
  sortBy: string | null;
};

export const PersonRow: React.FC<Props> = React.memo(
  ({ person, sortBy }) => (
    <>
      <td className={classNames({ 'is-selected': sortBy === 'name' })}>
        <PersonName
          name={person.name}
          slug={person.slug}
          sex={person.sex}
        />
      </td>
      <td className={classNames({ 'is-selected': sortBy === 'sex' })}>
        {person.sex === 'f' ? 'Female' : 'Male'}
      </td>
      <td className={classNames({ 'is-selected': sortBy === 'born' })}>
        {person.born}
      </td>
      <td className={classNames({ 'is-selected': sortBy === 'died' })}>
        {person.died}
      </td>
      <td style={{ color: '#ee3966' }}>
        {person.mother ? (
          <PersonName
            name={person.mother.name}
            slug={person.mother.slug}
            sex={person.mother.sex}
          />
        ) : person.motherName}
      </td>
      <td style={{ color: '#3099a7' }}>
        {person.father ? (
          <PersonName
            name={person.father.name}
            slug={person.father.slug}
            sex={person.father.sex}
          />
        ) : person.fatherName}
      </td>
    </>
  ),
);
