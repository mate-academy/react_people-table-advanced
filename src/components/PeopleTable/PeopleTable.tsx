import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { PersonItem } from '../PersonItem';
import { ColumnName } from '../ColumnNameItem';
import { ColumnNames, Person } from '../../types';

type Props = {
  filteredPeople: Person[],
};

export const PeopleTable: React.FC<Props> = ({
  filteredPeople,
}) => {
  const { slug } = useParams();
  const selectedPersonSlug = slug || '';

  if (!filteredPeople.length) {
    return null;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {(Object.keys(ColumnNames) as Array<keyof typeof ColumnNames>)
            .map(name => (
              <ColumnName
                key={name}
                value={name}
              />
            ))}

          <th>Mother</th>

          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <PersonItem
            key={person.slug}
            person={person}
            selectedPersonSlug={selectedPersonSlug}
          />
        ))}
      </tbody>

      <Outlet />
    </table>
  );
};
