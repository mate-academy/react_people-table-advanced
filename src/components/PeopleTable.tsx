import React from 'react';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

type Props = {
  selectedSlug?: string;
  people: Person[];
};

const SORT_TYPES = [
  { key: 'name', label: 'Name' },
  { key: 'sex', label: 'Sex' },
  { key: 'born', label: 'Born' },
  { key: 'died', label: 'Died' },
];

const allowedSorts: (keyof Person)[] = ['name', 'sex', 'born', 'died'];

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortFieldParam = searchParams.get('sort');
  const sortField = allowedSorts.includes(sortFieldParam as keyof Person)
    ? (sortFieldParam as keyof Person)
    : null;
  const sortOrder = searchParams.get('order');

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  //filter
  let filteredPeople = [...people];

  if (query) {
    filteredPeople = filteredPeople.filter(person =>
      [person.name, person.motherName, person.fatherName]
        .filter(Boolean)
        .some(field => field!.toLowerCase().includes(query)),
    );
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(p => p.sex === sex);
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(p => {
      const century = Math.ceil(p.born / 100).toString();

      return centuries.includes(century);
    });
  }

  //sort
  const handleSort = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');
    const params = new URLSearchParams(searchParams);

    if (currentSort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (!currentOrder) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const sortedPeople = [...filteredPeople];

  if (sortField) {
    sortedPeople.sort((a, b) => {
      const aValue = a[sortField as keyof Person];
      const bValue = b[sortField as keyof Person];

      if (aValue == null && bValue != null) {
        return 1;
      }

      if (aValue != null && bValue == null) {
        return -1;
      }

      if (aValue == null && bValue == null) {
        return 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }

      return 0;
    });

    if (sortOrder === 'desc') {
      sortedPeople.reverse();
    }
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_TYPES.map(sort => (
            <th
              key={sort.key}
              onClick={() => handleSort(sort.key)}
              style={{ cursor: 'pointer' }}
            >
              <span className="is-flex is-align-items-center">
                {sort.label}
                <span className="icon ml-1">
                  <i
                    className={cn('fas', {
                      'fa-sort-up': sortField === sort.key && !sortOrder,
                      'fa-sort-down':
                        sortField === sort.key && sortOrder === 'desc',
                      'fa-sort': sortField !== sort.key,
                    })}
                  />
                </span>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {sortedPeople.map(person => {
          const mother = person.motherName
            ? people.find(p => p.name === person.motherName) || null
            : null;
          const father = person.fatherName
            ? people.find(p => p.name === person.fatherName) || null
            : null;

          const isRowSelected = selectedSlug === person.slug;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': isRowSelected,
              })}
            >
              <td>
                <PersonLink person={person} name={person.name} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink person={mother} name={person.motherName} />
              </td>
              <td>
                <PersonLink person={father} name={person.fatherName} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
