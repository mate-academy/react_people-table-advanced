import React from 'react';
import { Props } from '../../types/Props';
import { PeopleTableBodyRow } from '../PeopleTableBodyRow';

export const PeopleTableBody: React.FC<Props> = ({ people }) => (
  <tbody>
    {people.map(person => (
      <PeopleTableBodyRow person={person} key={person.slug} />
    ))}
  </tbody>
);
