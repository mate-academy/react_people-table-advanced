import React from 'react';
import { Person } from '../types/Person';
import { useLocation } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import cn from 'classnames';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  people: Person[];
  allPeople: Person[];
  sortBy: keyof Person | null;
  sortOrder: 'asc' | 'desc';
};

const COLUMNS: { key: keyof Person; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'sex', label: 'Sex' },
  { key: 'born', label: 'Born' },
  { key: 'died', label: 'Died' },
];

export const PeopleTable: React.FC<Props> = ({
  people,
  allPeople,
  sortBy,
  sortOrder,
}) => {
  const { pathname } = useLocation();
  const byName = new Map(allPeople.map(p => [p.name, p]));

  const selectedSlug = pathname.startsWith('/people/')
    ? pathname.slice('/people/'.length)
    : null;

  const buildSortParams = (column: keyof Person): SearchParams => {
    if (sortBy !== column) {
      return { sort: column, order: 'asc' };
    }

    if (sortOrder === 'asc') {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const renderSortIcon = (key: keyof Person) => {
    const iconClass = cn('fas', {
      'fa-sort': sortBy !== key,
      'fa-sort-up': sortBy === key && sortOrder === 'asc',
      'fa-sort-down': sortBy === key && sortOrder === 'desc',
    });

    return (
      <SearchLink params={buildSortParams(key)} className="ml-1">
        <span className="icon">
          <i className={iconClass}></i>
        </span>
      </SearchLink>
    );
  };

  return (
    <table
      className="table is-striped is-hoverable is-narrow is-fullwidth"
      data-cy="peopleTable"
    >
      <thead>
        <tr>
          {COLUMNS.map(({ key, label }) => (
            <th key={key} role="button">
              <span
                className="is-flex is-flex-wrap-nowrap
              is-align-items-center"
              >
                {label}
                {renderSortIcon(key)}
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = person.slug === selectedSlug;

          const mother = person.motherName
            ? byName.get(person.motherName.trim())
            : undefined;
          const father = person.fatherName
            ? byName.get(person.fatherName.trim())
            : undefined;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born ?? '-'}</td>
              <td>{person.died ?? '-'}</td>
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
