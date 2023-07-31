import React, { useState, useMemo } from 'react';
import { useParams, NavLink, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  type SortField = keyof Person;

  const [searchParams] = useSearchParams();

  const [sortField, setSortField] = useState<string | null>(
    searchParams.get('sort') || null,
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
    searchParams.get('order') === 'desc' ? 'desc' : 'asc',
  );

  const handleSortClick = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortByField = (
    arr: Person[],
    field: keyof Person,
    order: 'asc' | 'desc',
  ) => {
    return [...arr].sort((a: Person, b: Person): number => {
      let aValue: number | string | null = null;
      let bValue: number | string | null = null;

      if (field === 'born' || field === 'died') {
        aValue = a[field];
        bValue = b[field];
      } else {
        aValue = a[field] as string | null;
        bValue = b[field] as string | null;
      }

      if (aValue === null && bValue === null) {
        return 0;
      }

      if (aValue === null) {
        return order === 'asc' ? -1 : 1;
      }

      if (bValue === null) {
        return order === 'asc' ? 1 : -1;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return order === 'asc'
        ? aValue.toString().localeCompare(bValue.toString())
        : bValue.toString().localeCompare(aValue.toString());
    });
  };

  const sortedPeople = useMemo(() => {
    if (!sortField) {
      return people;
    }

    return sortByField(people, sortField as SortField, sortOrder);
  }, [people, sortField, sortOrder]);

  const getSortIcon = (field: string, order: 'asc' | 'desc') => {
    return (
      <span className="icon">
        {sortField === field && sortOrder === order ? (
          <i className="fas fa-sort-up" />
        ) : (
          <i className="fas fa-sort" />
        )}
      </span>
    );
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
              <a
                href="#/people?sort=name"
                onClick={() => handleSortClick('name')}
              >
                <span className="icon">
                  {getSortIcon('name', 'asc')}
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people?sort=sex"
                onClick={() => handleSortClick('sex')}
              >
                <span className="icon">
                  {getSortIcon('sex', 'asc')}
                </span>
              </a>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
            >
              Born
              <a
                href="#/people?sort=born&amp;order=desc"
                onClick={() => handleSortClick('born')}
              >
                <span className="icon">
                  {getSortIcon('born', 'desc')}
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                onClick={() => handleSortClick('died')}
              >
                <span className="icon">
                  {getSortIcon('died', 'asc')}
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
            key={person.name}
            className={cn({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <NavLink
                to={`../${person.slug}`}
                className={cn(
                  { 'has-text-danger': person.sex === 'f' },
                )}
              >
                {person.name}
              </NavLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother
                ? (
                  <NavLink
                    to={`/people/${person.mother.slug}`}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </NavLink>
                ) : (
                  person.motherName || '-'
                )}
            </td>
            <td>
              {person.father
                ? (
                  <NavLink to={`/people/${person.father.slug}`}>
                    {person.fatherName}
                  </NavLink>
                ) : (
                  person.fatherName || '-'
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
