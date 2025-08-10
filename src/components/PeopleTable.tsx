/* eslint-disable jsx-a11y/control-has-associated-label */
import { PersonRecord } from './PersonRecord';
import { Person, SortField, SortOrder } from '../types';
import React, { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type FilterCondition<T> = (item: T) => boolean;

type Props = {
  people: Person[];
};

function createFilter<T>(
  conditions: FilterCondition<T>[],
): (item: T) => boolean {
  return function (item: T): boolean {
    return conditions.every(condition => condition(item));
  };
}

function getResultPeople(people: Person[], searchParams: URLSearchParams) {
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const gender = searchParams.get('sex') || '';

  const filter = createFilter<Person>([
    person =>
      [person.name, person.motherName, person.fatherName].some(
        field => field && field.toLowerCase().includes(query.toLowerCase()),
      ),
    person => !gender || person.sex === gender,
    person => {
      return (
        centuries.length === 0 ||
        centuries.includes(Math.ceil(person.born / 100).toString())
      );
    },
  ]);

  const filteredPeople = people.filter(filter);

  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order') as SortOrder | null;

  const sortFactor = order === 'desc' ? -1 : 1;

  const compareMap: Record<SortField, (a: Person, b: Person) => number> = {
    born: (a, b) => a.born - b.born,
    died: (a, b) => a.died - b.died,
    name: (a, b) => a.name.localeCompare(b.name),
    sex: (a, b) => a.sex.localeCompare(b.sex),
  };

  return [...filteredPeople].sort(
    (a, b) => (compareMap[sort as SortField]?.(a, b) ?? 0) * sortFactor,
  );
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order') as 'desc' | null;

  const getSortParams = useCallback(
    (field: SortField) => {
      if (sort !== field) {
        return { sort: field, order: null };
      }

      if (order === null) {
        return { sort: field, order: 'desc' };
      }

      return { sort: null, order: null };
    },
    [sort, order],
  );

  const getSortIcon = useCallback(
    (field: SortField) => {
      if (sort !== field) {
        return 'fas fa-sort';
      }

      if (order === null) {
        return 'fas fa-sort-up';
      }

      return 'fas fa-sort-down';
    },
    [sort, order],
  );

  const resultPeople = useMemo(
    () => getResultPeople(people, searchParams),
    [people, searchParams],
  );

  return resultPeople.length === 0 ? (
    <p>There are no people matching the current search criteria</p>
  ) : (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {resultPeople.map(person => (
          <PersonRecord
            key={person.slug}
            person={person}
            people={resultPeople}
          />
        ))}
      </tbody>
    </table>
  );
};
