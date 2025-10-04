/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  selectedSlug?: string;
  sort: string | null;
  order: string | null;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  sort,
  order,
}) => {
  const [searchParams] = useSearchParams();

  const getSortLink = (field: string) => {
    if (sort !== field) {
      // First click: sort ascending
      return getSearchWith(searchParams, { sort: field, order: null });
    } else if (sort === field && order === null) {
      // Second click: sort descending
      return getSearchWith(searchParams, { sort: field, order: 'desc' });
    } else {
      // Third click: disable sorting
      return getSearchWith(searchParams, { sort: null, order: null });
    }
  };

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return 'fas fa-sort';
    } else if (sort === field && order === null) {
      return 'fas fa-sort-up';
    } else {
      return 'fas fa-sort-down';
    }
  };

  const byName = useMemo(() => {
    const m = new Map<string, Person>();

    for (const p of people) {
      m.set(p.name, p);
    }

    return m;
  }, [people]);

  if (people.length === 0) {
    return null;
  }

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
              <Link to={{ search: getSortLink('name') }}>
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: getSortLink('sex') }}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: getSortLink('born') }}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: getSortLink('died') }}>
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = person.motherName
            ? byName.get(person.motherName)
            : undefined;
          const father = person.fatherName
            ? byName.get(person.fatherName)
            : undefined;
          const isSelected = selectedSlug === person.slug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : undefined}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  father ? (
                    <PersonLink person={father} />
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
