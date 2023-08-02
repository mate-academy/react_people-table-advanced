import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { SortAndFilter } from '../types/SortAndFilter';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
  sortField: string | null;
  sortOrder: 'asc' | 'desc' | null;
  onSortClick: (field: keyof Person) => void;
}

export const PeopleTable: React.FC<Props> = React.memo(({
  people,
  onSortClick,
  sortField,
  sortOrder,
}) => {
  const { slug } = useParams();

  const calculateOrder = (column: string) => {
    if (sortField === column) {
      return sortOrder === 'asc' ? 'desc' : 'asc';
    }

    return 'asc';
  };

  const calculateColumn = (column: string) => {
    if (sortField === column) {
      return sortOrder === 'desc' ? '' : column;
    }

    return column;
  };

  const getClassIcon = (column: string) => {
    if (sortField === column) {
      return sortOrder === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
    }

    return 'fas fa-sort';
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
                  sort: calculateColumn(SortAndFilter.NAME) || null,
                  order: calculateOrder(SortAndFilter.NAME) || null,
                }}
                onClick={() => onSortClick(SortAndFilter.NAME)}
              >
                <span className="icon">
                  <i className={getClassIcon(SortAndFilter.NAME)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  sort: calculateColumn(SortAndFilter.SEX) || null,
                  order: calculateOrder(SortAndFilter.SEX) || null,
                }}
                onClick={() => onSortClick(SortAndFilter.SEX)}
              >
                <span className="icon">
                  <i className={getClassIcon(SortAndFilter.SEX)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
            >
              Born
              <SearchLink
                params={{
                  sort: calculateColumn(SortAndFilter.BORN) || null,
                  order: calculateOrder(SortAndFilter.BORN) || null,
                }}
                onClick={() => onSortClick(SortAndFilter.BORN)}
              >
                <span className="icon">
                  <i className={getClassIcon(SortAndFilter.BORN)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  sort: calculateColumn(SortAndFilter.DIED) || null,
                  order: calculateOrder(SortAndFilter.DIED) || null,
                }}
                onClick={() => onSortClick(SortAndFilter.DIED)}
              >
                <span className="icon">
                  <i className={getClassIcon(SortAndFilter.DIED)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
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
});
