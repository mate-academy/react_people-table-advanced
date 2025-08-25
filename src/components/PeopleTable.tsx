/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../types/Person';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

function nextSortParams(
  currentSort: string | null,
  currentOrder: string | null,
  field: SortField,
) {
  // 1-й клік: sort=field (ASC)
  if (currentSort !== field) {
    return { sort: field, order: null as unknown as string };
  }

  // 2-й клік: DESC
  if (currentSort === field && currentOrder !== 'desc') {
    return { sort: field, order: 'desc' };
  }

  // 3-й клік: вимкнути сортування
  return { sort: null as unknown as string, order: null as unknown as string };
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const HeaderCell: React.FC<{
    label: string;
    field: SortField;
    cy: string;
  }> = ({ label, field, cy }) => {
    const next = nextSortParams(sort, order, field);
    const isActive = sort === field;
    const isDesc = isActive && order === 'desc';

    return (
      <th>
        <span className="is-flex is-flex-wrap-nowrap is-align-items-center">
          {label}
          <SearchLink className="ml-2" params={next} data-cy={cy}>
            <span className="icon">
              <i
                className={`fas ${
                  !isActive ? 'fa-sort' : isDesc ? 'fa-sort-down' : 'fa-sort-up'
                }`}
              />
            </span>
          </SearchLink>
        </span>
      </th>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <HeaderCell label="Name" field="name" cy="nameSort" />
          <HeaderCell label="Sex" field="sex" cy="sexSort" />
          <HeaderCell label="Born" field="born" cy="bornSort" />
          <HeaderCell label="Died" field="died" cy="diedSort" />
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(p => (
          <tr key={p.slug} data-cy="person">
            <td>
              <a href={`#/people/${p.slug}`}>{p.name}</a>
            </td>
            <td>{p.sex}</td>
            <td>{p.born}</td>
            <td>{p.died}</td>
            <td>
              {p.motherName ? (
                <a
                  className="has-text-danger"
                  href={`#/people/${p.mother?.slug ?? ''}`}
                >
                  {p.motherName}
                </a>
              ) : (
                '—'
              )}
            </td>
            <td>
              {p.fatherName ? (
                <a href={`#/people/${p.father?.slug ?? ''}`}>{p.fatherName}</a>
              ) : (
                '—'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
