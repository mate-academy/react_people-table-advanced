/* eslint-disable no-param-reassign */
import React, { useState, useMemo } from 'react';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

type SortKey = keyof Omit<Person, 'slug' | 'mother' | 'father'>;

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: string;
  } | null>(null);
  const [highlightedName, setHighlightedName] = useState<string | null>(null);

  const handleSort = (key: SortKey) => {
    let direction = 'asc';

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    } else if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'desc'
    ) {
      direction = '';
    }

    setSortConfig(direction ? { key, direction } : null);
    const newParams = new URLSearchParams(searchParams);

    if (direction) {
      newParams.set('sort', key);
      newParams.set('order', direction);
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  const sortedPeople = useMemo(() => {
    if (sortConfig) {
      return [...people].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === null || bValue === null) {
          if (aValue === null && bValue !== null) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }

          if (aValue !== null && bValue === null) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }

          return 0;
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }

        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }

        return 0;
      });
    }

    return people;
  }, [people, sortConfig]);

  const allNames = people.reduce(
    (acc, person) => {
      acc[person.name] = person;

      return acc;
    },
    {} as { [key: string]: Person },
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>Name</th>
          <th onClick={() => handleSort('sex')}>Sex</th>
          <th onClick={() => handleSort('born')}>Born</th>
          <th onClick={() => handleSort('died')}>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <PersonLink
            person={person}
            key={person.slug}
            allNames={allNames}
            highlightedName={highlightedName}
            setHighlightedName={setHighlightedName}
          />
        ))}
      </tbody>
    </table>
  );
};
