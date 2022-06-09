import classNames from 'classnames';
import React from 'react';
import { People } from '../../type';

import { PersonName } from '../PersonName/PersonName';

type Props = {
  person: People;
  sortBy: string | null;
  people: People[]
};

export const PersonRow: React.FC<Props> = React.memo(
  ({ person, sortBy, people }) => {
    const personMother = people.find(man => man.name === person.motherName);
    const personFather = people.find(man => man.name === person.fatherName);
    return (
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
        {personMother ? (
          <PersonName
            name={personMother.name}
            slug={personMother.slug}
            sex={personMother.sex}
          />
        ) : person.motherName}
      </td>
      <td style={{ color: '#3099a7' }}>
        {personFather ? (
          <PersonName
            name={personFather.name}
            slug={personFather.slug}
            sex={personFather.sex}
          />
        ) : person.fatherName}
      </td>
    </>
    )
  },
);
