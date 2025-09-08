import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import React from 'react';
import { SetURLSearchParams } from 'react-router-dom';

/* eslint-disable jsx-a11y/control-has-associated-label */
type PeopleTableProps = {
  selectedSlug?: string;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  visiblePeople: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  selectedSlug,
  searchParams,
  visiblePeople,
  setSearchParams,
}) => {
  const peopleExist = visiblePeople !== undefined && visiblePeople.length !== 0;
  const getSortIcon = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== field) {
      return 'fa-sort';
    }

    if (currentOrder === 'desc') {
      return 'fa-sort-down';
    }

    return 'fa-sort-up';
  };

  const toggleSort = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    const newParams = new URLSearchParams(searchParams);

    if (currentSort !== field) {
      newParams.set('sort', field);
      newParams.delete('order');
    } else if (currentOrder !== 'desc') {
      newParams.set('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const sortedPeople = [...visiblePeople].sort((a, b) => {
    if (!sortField) {
      return 0;
    }

    const valA = a[sortField as keyof Person];
    const valB = b[sortField as keyof Person];

    if (valA === null || valA === undefined) {
      return 1;
    }

    if (valB === null || valB === undefined) {
      return -1;
    }

    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortOrder === 'desc'
        ? valB.localeCompare(valA)
        : valA.localeCompare(valB);
    }

    return sortOrder === 'desc'
      ? Number(valB) - Number(valA)
      : Number(valA) - Number(valB);
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {peopleExist && (
        <thead>
          <tr>
            <th>
              <span
                className="is-flex is-flex-wrap-nowrap"
                onClick={() => toggleSort('name')}
              >
                Name
                <a>
                  <span className="icon">
                    <i className={cn('fas', getSortIcon('name'))} />
                  </span>
                </a>
              </span>
            </th>

            <th>
              <span
                className="is-flex is-flex-wrap-nowrap"
                onClick={() => toggleSort('sex')}
              >
                Sex
                <a>
                  <span className="icon">
                    <i className={cn('fas', getSortIcon('sex'))} />
                  </span>
                </a>
              </span>
            </th>

            <th>
              <span
                className="is-flex is-flex-wrap-nowrap"
                onClick={() => toggleSort('born')}
              >
                Born
                <a>
                  <span className="icon">
                    <i className={cn('fas', getSortIcon('born'))} />
                  </span>
                </a>
              </span>
            </th>

            <th>
              <span
                className="is-flex is-flex-wrap-nowrap"
                onClick={() => toggleSort('died')}
              >
                Died
                <a>
                  <span className="icon">
                    <i className={cn('fas', getSortIcon('died'))} />
                  </span>
                </a>
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
      )}

      <tbody>
        {sortedPeople?.map(person => {
          const motherExist = sortedPeople.find(
            pers => pers.name === person.motherName,
          );
          const fatherExist = sortedPeople.find(
            pers => pers.name === person.fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': person.slug === selectedSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  motherExist ? (
                    <PersonLink person={motherExist} />
                  ) : (
                    <span className="has-text-danger">{person.motherName}</span>
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  fatherExist ? (
                    <PersonLink person={fatherExist} />
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
