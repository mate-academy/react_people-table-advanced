import React, { useState } from 'react';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { SortLink } from './SortLink';

/* eslint-disable jsx-a11y/control-has-associated-label */

interface Props {
  people:Person[]
}

export const PeopleTable:React.FC<Props> = ({ people }) => {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('asc');

  const sortedPeople = [...people];

  if (sortField) {
    sortedPeople.sort((person1, person2) => {
      const aValue = person1[sortField as keyof Person];
      const bValue = person2[sortField as keyof Person];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortOrder === 'asc') {
          return aValue.localeCompare(bValue);
        }

        if (sortOrder === 'desc') {
          return bValue.localeCompare(aValue);
        }
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        if (sortOrder === 'asc') {
          return aValue - bValue;
        }

        if (sortOrder === 'desc') {
          return bValue - aValue;
        }
      }

      return 0;
    });
  }

  const handleSort = (field: string) => {
    if (field === sortField) {
      // Clicking on the same field again
      // eslint-disable-next-line no-nested-ternary
      setSortOrder(prevOrder => (prevOrder === 'asc'
        ? 'desc'
        : prevOrder === 'desc' ? '' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const findParent = (parentName: string) => {
    return people.find(person => person.name === parentName);
  };

  const namesFromServer = people.map(person => person.name);

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
              <a href="#/people?sort=name">
                <SortLink field="name" onSort={() => handleSort('name')} />
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <SortLink field="sex" onSort={() => handleSort('sex')} />
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <SortLink field="born" onSort={() => handleSort('born')} />
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <SortLink field="died" onSort={() => handleSort('born')} />
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map((person) => (
          <PersonLink
            key={person.name}
            person={person}
            names={namesFromServer}
            findParent={findParent}
          />
        ))}
      </tbody>
    </table>
  );
};
