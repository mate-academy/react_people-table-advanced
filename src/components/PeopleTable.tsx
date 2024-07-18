import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

interface Props {
  people: Person[];
}

const sortFields = ['name', 'sex', 'born', 'died'] as const;

type SortField = (typeof sortFields)[number];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const sexFilter = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort') as SortField | null;
  const sortOrder = searchParams.get('order');

  const handleSortClick = (field: SortField) => {
    const isSameField = sortField === field;
    const isAsc = sortOrder !== 'desc';

    const newSortOrder =
      isSameField && isAsc ? 'desc' : isSameField ? undefined : 'asc';
    const newParams = new URLSearchParams(searchParams.toString());

    if (newSortOrder) {
      newParams.set('sort', field);
      newParams.set('order', newSortOrder);
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      let matchesQuery = true;
      let matchesSex = true;
      let matchesCentury = true;

      if (query) {
        const lowerQuery = query.toLowerCase();

        matchesQuery =
          person.name.toLowerCase().includes(lowerQuery) ||
          person.motherName?.toLowerCase().includes(lowerQuery) ||
          false ||
          person.fatherName?.toLowerCase().includes(lowerQuery) ||
          false;
      }

      if (sexFilter) {
        matchesSex = person.sex === sexFilter;
      }

      if (centuries.length > 0) {
        const personCentury = Math.ceil(person.born / 100);

        matchesCentury = centuries.includes(personCentury.toString());
      }

      return matchesQuery && matchesSex && matchesCentury;
    });
  }, [people, query, sexFilter, centuries]);

  const sortedPeople = useMemo(() => {
    if (!sortField) {
      return filteredPeople;
    }

    const compare = (a: Person, b: Person) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return fieldA.localeCompare(fieldB);
      }

      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return fieldA - fieldB;
      }

      return 0;
    };

    const sorted = [...filteredPeople].sort(compare);

    return sortOrder === 'desc' ? sorted.reverse() : sorted;
  }, [filteredPeople, sortField, sortOrder]);

  return sortedPeople.length !== 0 ? (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a
                href="#/people"
                onClick={e => {
                  e.preventDefault();
                  handleSortClick('name');
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people"
                onClick={e => {
                  e.preventDefault();
                  handleSortClick('sex');
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people"
                onClick={e => {
                  e.preventDefault();
                  handleSortClick('born');
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people"
                onClick={e => {
                  e.preventDefault();
                  handleSortClick('died');
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {sortedPeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={person.slug === slug ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : (
                <span>{person.motherName || '-'}</span>
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : (
                <span>{person.fatherName || '-'}</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>There are no people matching the current search criteria</p>
  );
};
