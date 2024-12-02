import React, { useState } from 'react';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

type PeopleTableProps = {
  people: Person[];
  selectedSlug: string;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedSlug,
}) => {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  // Extract query params from the URL
  const queryParams = new URLSearchParams(location.search);
  const initialSortField = queryParams.get('sort');
  const initialSortOrder = queryParams.get('order') as 'asc' | 'desc' | null;

  // Sync the state with the URL params on initial load
  React.useEffect(() => {
    if (initialSortField) {
      setSortField(initialSortField);
      setSortOrder(initialSortOrder);
    }
  }, [initialSortField, initialSortOrder]);

  // Handle sort field change
  const handleSort = (field: string) => {
    if (field === sortField) {
      // If already sorting by the same field, toggle the order
      setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      // If sorting by a new field, set to ascending order
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Handle URL updates for sorting
  React.useEffect(() => {
    if (sortField) {
      const searchParams = new URLSearchParams();

      searchParams.set('sort', sortField);
      if (sortOrder) {
        searchParams.set('order', sortOrder);
      }

      navigate({ search: searchParams.toString() }); // Use navigate instead of history.push
    } else {
      // Remove sorting params if sorting is disabled
      navigate({ search: '' });
    }
  }, [sortField, sortOrder, navigate]);

  // Sort people based on selected field and order
  const sortedPeople = [...people];

  if (sortField && sortOrder) {
    sortedPeople.sort((a, b) => {
      const aValue = a[sortField as keyof Person];
      const bValue = b[sortField as keyof Person];

      // Null checks before comparing values
      if (
        aValue === null ||
        aValue === undefined ||
        bValue === null ||
        bValue === undefined
      ) {
        return 0; // Or handle null/undefined values based on your logic
      }

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }

  const generateSlug = (name: string, born: number): string => {
    return `${name.toLowerCase().replace(/\s+/g, '-')}-${born}`;
  };

  const findMotherBorn = (motherName: string): number | null => {
    const mother = people.find(p => p.name === motherName);

    return mother ? mother.born : null;
  };

  const findFatherBorn = (fatherName: string): number | null => {
    const father = people.find(p => p.name === fatherName);

    return father ? father.born : null;
  };

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
              <SearchLink
                params={{
                  sort: 'name',
                  order: sortOrder === 'asc' ? 'desc' : 'asc',
                }}
                onClick={() => handleSort('name')}
              >
                <span className="icon">
                  <i
                    className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  sort: 'sex',
                  order: sortOrder === 'asc' ? 'desc' : 'asc',
                }}
                onClick={() => handleSort('sex')}
              >
                <span className="icon">
                  <i
                    className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  sort: 'born',
                  order: sortOrder === 'asc' ? 'desc' : 'asc',
                }}
                onClick={() => handleSort('born')}
              >
                <span className="icon">
                  <i
                    className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  sort: 'died',
                  order: sortOrder === 'asc' ? 'desc' : 'asc',
                }}
                onClick={() => handleSort('died')}
              >
                <span className="icon">
                  <i
                    className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {sortedPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <a
                href={`#/people/${person.slug}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </a>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                people.some(p => p.name === person.motherName) ? (
                  <a
                    href={`#/people/${generateSlug(person.motherName, findMotherBorn(person.motherName) || person.born)}`}
                    data-cy="mother-link"
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </a>
                ) : (
                  <span>{person.motherName}</span>
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                people.some(p => p.name === person.fatherName) ? (
                  <a
                    href={`#/people/${generateSlug(person.fatherName, findFatherBorn(person.fatherName) || person.born)}`}
                    data-cy="father-link"
                  >
                    {person.fatherName}
                  </a>
                ) : (
                  <span>{person.fatherName}</span>
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
