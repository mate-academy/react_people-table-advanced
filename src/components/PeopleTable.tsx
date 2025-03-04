import React from 'react';
import { Person } from '../types';
import { PersonRow } from './PersonRow';
import { useParams, useSearchParams } from 'react-router-dom';

import '../App.scss';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people = [] }) => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParms] = useSearchParams();

  const filter = searchParams.get('filter')?.toLowerCase() || '';
  const sortBy = searchParams.get('sortBy') || '';
  const order = searchParams.get('order') || 'asc';
  const sexFilter = searchParams.get('sex');
  const selectedCentury = searchParams.getAll('century').map(Number);

  const getCentury = (year: number): number => Math.ceil(year / 100);

  const filteredPeople = people
    .filter(person => person.name.toLocaleLowerCase().includes(filter))
    .filter(person => (sexFilter ? person.sex === sexFilter : true));

  const filterByCentury = filteredPeople.filter(person => {
    const personCentury = getCentury(person.born);

    return (
      selectedCentury.length === 0 || selectedCentury.includes(personCentury)
    );
  });

  const sortedPeople = [...filterByCentury].sort((a, b) => {
    if (!sortBy) {
      return 0;
    }

    const valueA = a[sortBy as keyof Person];
    const valueB = b[sortBy as keyof Person];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return order === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return order === 'asc' ? valueA - valueB : valueB - valueA;
    }

    return 0;
  });

  const handleSort = (column: keyof Person) => {
    const newOrder = sortBy === column && order === 'asc' ? 'desc' : 'asc';

    setSearchParms(prev => {
      prev.set('sortBy', column);
      prev.set('order', newOrder);

      return prev;
    });
  };

  const getSortIcon = (column: keyof Person) => {
    const baseClass = 'fa ml-1';
    const isActive = sortBy === column;
    const iconClass = isActive
      ? order === 'asc'
        ? 'fa-sort-up'
        : 'fa-sort-down'
      : 'fa-sort';

    return <i className={`${baseClass} ${iconClass} sort-icon `} />;
  };

  return (
    <div className="table-container">
      {people.length === 0 ? (
        <p data-cy="noPeopleMessage">There are no people on server</p>
      ) : filteredPeople.length === 0 ? (
        <p className="noMatchingPeople">
          There are no people matching the current criteria
        </p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th
                onClick={() => handleSort('name')}
                style={{ cursor: 'pointer' }}
                className="sortable"
              >
                Name {getSortIcon('name')}
              </th>
              <th
                onClick={() => handleSort('sex')}
                style={{ cursor: 'pointer' }}
                className="sortable"
              >
                Sex {getSortIcon('sex')}
              </th>
              <th
                onClick={() => handleSort('born')}
                style={{ cursor: 'pointer' }}
                className="sortable"
              >
                Born {getSortIcon('born')}
              </th>
              <th
                onClick={() => handleSort('died')}
                style={{ cursor: 'pointer' }}
                className="sortable"
              >
                Died {getSortIcon('died')}
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>
          <tbody>
            {sortedPeople.map(person => (
              <PersonRow
                key={person.slug}
                person={person}
                isSelected={slug === person.slug}
                people={people}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
