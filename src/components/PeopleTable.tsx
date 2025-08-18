import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleTableProps } from '../types';
import PersonLink from './PersonLink';
import React from 'react';

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  peopleMap,
}) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // const search = searchParams.get('search') || '';
  const query = searchParams.get('query') || '';
  const sortField = searchParams.get('sort');
  const order = searchParams.get('order');
  const selectedCenturies = searchParams.getAll('centuries');
  const selectedSex = searchParams.get('sex');

  const filteredPeople = people.filter(person => {
    const matchesSearch = [
      person.name,
      person.motherName,
      person.fatherName,
    ].some(n => n?.toLowerCase().includes(query.toLowerCase()));

    const personCentury = Math.ceil(person.born / 100);

    const matchesCentury =
      selectedCenturies.length === 0 ||
      selectedCenturies.includes(String(personCentury));

    const matchesSex = !selectedSex || person.sex === selectedSex;

    return matchesSearch && matchesCentury && matchesSex;
  });

  const handleSort = (field: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (sortField !== field) {
      newParams.set('sort', field);
      newParams.delete('order');
    } else if (!order) {
      newParams.set('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sortField) {
      return 0;
    }

    const aVal = a[sortField as keyof typeof a];
    const bVal = b[sortField as keyof typeof b];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return order === 'desc' ? bVal - aVal : aVal - bVal;
    }

    const aStr = aVal !== undefined && aVal !== null ? String(aVal) : '';
    const bStr = bVal !== undefined && bVal !== null ? String(bVal) : '';

    const result = aStr.localeCompare(bStr, undefined, { numeric: true });

    return order === 'desc' ? -result : result;

    // const aStr = aVal !== undefined && aVal !== null ? String(aVal) : '';
    // const bStr = bVal !== undefined && bVal !== null ? String(bVal) : '';

    // const result = aStr.localeCompare(bStr, undefined, { numeric: true });

    // return order === 'desc' ? -result : result;
  });

  const renderSortArrow = (field: string) => {
    if (sortField !== field) {
      return null;
    }

    if (!order) {
      return '▲';
    }

    if (order === 'desc') {
      return '▼';
    }

    return null;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th
              key={field}
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort(field)}
            >
              {field[0].toUpperCase() + field.slice(1)}
              {renderSortArrow(field) ? ` ${renderSortArrow(field)}` : null}
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const isSelected = slug === person.slug;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={isSelected ? 'has-background-warning' : ''}
              style={{ cursor: 'pointer' }}
            >
              <td>
                <PersonLink personName={person.name} peopleMap={peopleMap} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink
                  personName={person.motherName}
                  peopleMap={peopleMap}
                />
              </td>
              <td>
                <PersonLink
                  personName={person.fatherName}
                  peopleMap={peopleMap}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
