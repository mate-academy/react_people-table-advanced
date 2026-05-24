/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

type SortField = 'name' | 'sex' | 'born' | 'died';
type SortOrder = 'asc' | 'desc' | null;

type Props = {
  people: Person[];
  sortField: SortField | null;
  sortOrder: SortOrder;
};

const SORT_FIELDS: SortField[] = ['name', 'sex', 'born', 'died'];

const getNextSortParams = (
  field: SortField,
  currentField: SortField | null,
  currentOrder: SortOrder,
) => {
  if (currentField !== field) {
    return { sort: field, order: null };
  }

  if (currentOrder === 'asc') {
    return { sort: field, order: 'desc' };
  }

  return { sort: null, order: null };
};

export const PeopleTable = ({ people, sortField, sortOrder }: Props) => {
  const [searchParams] = useSearchParams();
  const { slug: selectedSlug } = useParams();
  const search = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const visiblePeopleByName = new Map(
    people.map(person => [person.name.toLowerCase(), person]),
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_FIELDS.map(field => {
            const isActive = sortField === field;
            const iconClass = isActive
              ? sortOrder === 'asc'
                ? 'fa-sort-up'
                : 'fa-sort-down'
              : 'fa-sort';

            return (
              <th key={field}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {field[0].toUpperCase() + field.slice(1)}
                  <SearchLink
                    params={getNextSortParams(field, sortField, sortOrder)}
                  >
                    <span
                      className={`icon ${isActive ? 'has-text-primary' : ''}`}
                    >
                      <i className={`fas ${iconClass}`} aria-hidden="true" />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = person.motherName
            ? visiblePeopleByName.get(person.motherName.toLowerCase())
            : undefined;
          const father = person.fatherName
            ? visiblePeopleByName.get(person.fatherName.toLowerCase())
            : undefined;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                selectedSlug === person.slug
                  ? 'has-background-warning'
                  : undefined
              }
            >
              <td>
                <Link
                  to={{ pathname: `/people/${person.slug}`, search }}
                  className={person.sex === 'f' ? 'has-text-danger' : undefined}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <Link
                    to={{ pathname: `/people/${mother.slug}`, search }}
                    className={
                      mother.sex === 'f' ? 'has-text-danger' : undefined
                    }
                  >
                    {mother.name}
                  </Link>
                ) : (
                  (person.motherName ?? '-')
                )}
              </td>
              <td>
                {father ? (
                  <Link
                    to={{ pathname: `/people/${father.slug}`, search }}
                    className={
                      father.sex === 'f' ? 'has-text-danger' : undefined
                    }
                  >
                    {father.name}
                  </Link>
                ) : (
                  (person.fatherName ?? '-')
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
