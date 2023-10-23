import React from 'react';
import { Person } from '../../../types/Person';
import { PersonItem } from '../PersonItem/PersonItem';
import { OrderControl } from '../OrderControl/OrderControl';
import { useDisplayPeople } from './useDisplayPeople';

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { displayedPeople } = useDisplayPeople();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <OrderControl sort="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <OrderControl sort="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <OrderControl sort="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <OrderControl sort="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {displayedPeople(people).map(person => (
          <PersonItem
            person={person}
            key={person.slug}
          />
        ))}

      </tbody>
    </table>
  );
};
