import React, { useEffect, useState } from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';

import { PersonItem } from '../PersonItem';
import { ColumnName } from '../ColumnNameItem';

import {
  ColumnNames,
  FilterType,
  filterPeople,
  sortPeople,
} from '../../api';

import { Person } from '../../types';

type Props = {
  people: Person[],
  filteredPeople: Person[],
  setFilteredPeople: React.Dispatch<React.SetStateAction<Person[]>>,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  filteredPeople,
  setFilteredPeople,
}) => {
  const { slug } = useParams();
  const selectedPersonSlug = slug || '';

  const [sortedPeople, setSortedPeople] = useState(people);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const filters: FilterType = {
    query,
    centuries,
    sex,
  };

  useEffect(() => {
    setSortedPeople(sortPeople(people, sort));
  }, [sort, query, centuries.length, sex]);

  useEffect(() => {
    setFilteredPeople(filterPeople(filters, sortedPeople));
  }, [query, centuries.length, sex, sortedPeople]);

  if (order === 'desc') {
    filteredPeople.reverse();
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
