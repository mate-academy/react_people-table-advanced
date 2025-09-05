// src/components/PeopleTable.tsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { SearchLink } from './SearchLink';

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople().then(data => {
      setPeople(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const query = searchParams.get('query')?.toLowerCase().trim() ?? '';
  const selectedCenturies = searchParams
    .getAll('centuries')
    .map(c => parseInt(c, 10));

  const filteredPeople = people.filter(p => {
    const matchesQuery =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.motherName?.toLowerCase().includes(query) ||
      p.fatherName?.toLowerCase().includes(query);

    const birthCentury = Math.floor(p.born / 100) + 1;
    const matchesCentury =
      selectedCenturies.length === 0 ||
      selectedCenturies.includes(birthCentury);

    return matchesQuery && matchesCentury;
  });

  const sortField = searchParams.get('sort') as SortField | null;
  const sortOrder = searchParams.get('order') as 'asc' | 'desc' | null;

  const sortedPeople = [...filteredPeople];

  if (sortField && ['name', 'sex', 'born', 'died'].includes(sortField)) {
    sortedPeople.sort((a: Person, b: Person) => {
      switch (sortField) {
        case 'name':
        case 'sex':
          return sortOrder === 'desc'
            ? b[sortField].localeCompare(a[sortField])
            : a[sortField].localeCompare(b[sortField]);
        case 'born':
        case 'died':
          return sortOrder === 'desc'
            ? b[sortField] - a[sortField]
            : a[sortField] - b[sortField];
      }
    });
  }

  const getNextSortParams = (field: SortField) => {
    if (sortField !== field) {
      return { sort: field, order: null };
    }

    if (!sortOrder) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>
            <SearchLink params={getNextSortParams('name')} pathname="/people">
              Name
            </SearchLink>
          </th>
          <th>
            <SearchLink params={getNextSortParams('sex')} pathname="/people">
              Sex
            </SearchLink>
          </th>
          <th>
            <SearchLink params={getNextSortParams('born')} pathname="/people">
              Born
            </SearchLink>
          </th>
          <th>
            <SearchLink params={getNextSortParams('died')} pathname="/people">
              Died
            </SearchLink>
          </th>
          <th>Father</th>
          <th>Mother</th>
        </tr>
      </thead>
      <tbody>
        {sortedPeople.map((person: Person) => (
          <tr key={person.slug}>
            <td>
              <SearchLink params={{}} pathname={`/people/${person.slug}`}>
                {person.name}
              </SearchLink>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{person.fatherName}</td>
            <td>{person.motherName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
