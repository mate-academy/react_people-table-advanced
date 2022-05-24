import classNames from 'classnames';
import React from 'react';
import { People } from '../../type';

import { PersonName } from '../PersonName/PersonName';

type Props = {
  person: People;
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
        {person.motherName ? (
          <PersonName
            name={person.name}
            slug={person.slug}
            sex={person.sex}
          />
        ) : person.motherName}
      </td>
      <td style={{ color: '#3099a7' }}>
        {person.fatherName ? (
          <PersonName
            name={person.name}
            slug={person.slug}
            sex={person.sex}
          />
        ) : person.fatherName}
      </td>
    </>
  ),
);
