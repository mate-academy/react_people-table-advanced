import React from 'react';
import { PersonLink } from './../PersonLink';
import { Person, SortType, SortTypeKey } from './../../types';

import { PeopleSort } from './../PeopleSort';

type Props = {
  people: Person[];
  selectedSlug: string | undefined;
  sortField: string | null;
  sortOrder: string | null;
};

import { SortTypes } from './../../types';
export const sortTitle = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  sortField,
  sortOrder,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {(Object.entries(SortTypes) as [SortTypeKey, SortType][]).map(
            ([key, value]) => {
              return (
                <PeopleSort
                  key={value}
                  sortType={value}
                  sortTitle={key}
                  sortField={sortField}
                  sortOrder={sortOrder}
                />
              );
            },
          )}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            people={people}
            selectedSlug={selectedSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
