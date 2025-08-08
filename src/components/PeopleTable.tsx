import React, { useMemo } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

type SortParams = {
  sort: string | null;
  currentOrder: string | null;
  clickedField: string;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const nameToPersonMap = useMemo(() => {
    return people.reduce(
      (map, person) => ({
        ...map,
        [person.name]: person,
      }),
      {} as Record<string, Person>,
    );
  }, [people]);

  const location = useLocation();
  const activeSlug = location.pathname.split('/').at(-1);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];

  const sortBy = searchParams.get('sort');
  const order = searchParams.get('order');

  const clearQuery = query.trim().toLowerCase();

  const getNextSortState = ({
    sort,
    currentOrder,
    clickedField,
  }: SortParams): {
    sort: string | null;
    order: string | null;
  } => {
    if (sort !== clickedField) {
      return { sort: clickedField, order: null };
    }

    if (currentOrder !== 'desc') {
      return { sort: clickedField, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const visiblePeople = people
    .filter(person => {
      if (!query.trim()) {
        return true;
      }

      const name = person.name.toLowerCase();
      const mother = person.motherName?.toLowerCase() || '';
      const father = person.fatherName?.toLowerCase() || '';

      return (
        name.includes(clearQuery) ||
        mother.includes(clearQuery) ||
        father.includes(clearQuery)
      );
    })
    .filter(person => {
      if (!sex) {
        return true;
      }

      return person.sex === sex;
    })
    .filter(person => {
      if (centuries.length === 0) {
        return true;
      }

      const personCentury = Math.ceil(person.born / 100).toString();

      return centuries.includes(personCentury);
    })
    .sort((a, b) => {
      if (!sortBy) {
        return 0;
      }

      const direction = order === 'desc' ? -1 : 1;

      if (sortBy === 'name' || sortBy === 'sex') {
        return a[sortBy].localeCompare(b[sortBy]) * direction;
      }

      if (sortBy === 'born' || sortBy === 'died') {
        return (a[sortBy] - b[sortBy]) * direction;
      }

      return 0;
    });

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
                  ...getNextSortState({
                    sort: sortBy,
                    currentOrder: order,
                    clickedField: 'name',
                  }),
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  ...getNextSortState({
                    sort: sortBy,
                    currentOrder: order,
                    clickedField: 'sex',
                  }),
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  ...getNextSortState({
                    sort: sortBy,
                    currentOrder: order,
                    clickedField: 'born',
                  }),
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  ...getNextSortState({
                    sort: sortBy,
                    currentOrder: order,
                    clickedField: 'died',
                  }),
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={
              activeSlug === person.slug ? 'has-background-warning' : undefined
            }
          >
            <td>{<PersonLink person={person} />}</td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                Object.hasOwn(nameToPersonMap, person.motherName) ? (
                  <PersonLink person={nameToPersonMap[person.motherName]} />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                Object.hasOwn(nameToPersonMap, person.fatherName) ? (
                  <PersonLink person={nameToPersonMap[person.fatherName]} />
                ) : (
                  person.fatherName
                )
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
