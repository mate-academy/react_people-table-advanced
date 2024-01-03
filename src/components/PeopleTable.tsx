/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Person } from '../types';
import { PersonComponent } from './PersonComponent';
import { getPeopleByName } from '../utils/peopleHelper';
import { useVisiblePeople } from '../hooks/useVisiblePeople';
import { SortTableHeader } from './SortTableHeader';
import { SortBy } from '../constants/SortBy';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const visiblePeople = useVisiblePeople(people);

  if (!visiblePeople.length) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <SortTableHeader sortQuery={SortBy.Name}>Name</SortTableHeader>
          <SortTableHeader sortQuery={SortBy.Sex}>Sex</SortTableHeader>
          <SortTableHeader sortQuery={SortBy.Born}>Born</SortTableHeader>
          <SortTableHeader sortQuery={SortBy.Died}>Died</SortTableHeader>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          const preparedPerson = {
            ...person,
            mother: getPeopleByName(people, person.motherName),
            father: getPeopleByName(people, person.fatherName),
          };

          return <PersonComponent person={preparedPerson} key={person.slug} />;
        })}
      </tbody>
    </table>
  );
};
