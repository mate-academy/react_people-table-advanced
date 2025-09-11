import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  selectedSlug?: string;
}

const toggleOrder = (current: string | null) => {
  if (!current) {
    return 'asc';
  }

  if (current === 'asc') {
    return 'desc';
  }

  return '';
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const handleSort = (field: keyof Person) => {
    const next = new URLSearchParams(searchParams.toString());

    if (sortField === field) {
      const nextOrder = toggleOrder(sortOrder);

      if (nextOrder) {
        next.set('order', nextOrder);
      } else {
        next.delete('sort');
        next.delete('order');
      }
    } else {
      next.set('sort', field);
      next.set('order', 'asc');
    }

    setSearchParams(next);
  };

  const getArrow = (field: string) => {
    if (sortField !== field) {
      return '';
    }

    return sortOrder === 'asc' ? ' ↑' : sortOrder === 'desc' ? ' ↓' : '';
  };

  return (
    <table
      className="table is-striped is-hoverable is-fullwidth"
      data-cy="peopleTable"
    >
      <thead>
        <tr>
          <th>
            <button
              className="button is-white"
              onClick={() => handleSort('name')}
              data-cy="sortName"
            >
              Name{getArrow('name')}
            </button>
          </th>
          <th>
            <button
              className="button is-white"
              onClick={() => handleSort('sex')}
              data-cy="sortSex"
            >
              Sex{getArrow('sex')}
            </button>
          </th>
          <th>
            <button
              className="button is-white"
              onClick={() => handleSort('born')}
              data-cy="sortBorn"
            >
              Born{getArrow('born')}
            </button>
          </th>
          <th>
            <button
              className="button is-white"
              onClick={() => handleSort('died')}
              data-cy="sortDied"
            >
              Died{getArrow('died')}
            </button>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
            data-cy="person"
          >
            <td data-cy="personName">
              <PersonLink personName={person.name} peoples={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                <PersonLink personName={person.motherName} peoples={people} />
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <PersonLink personName={person.fatherName} peoples={people} />
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
