/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../types/Person';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = { people: Person[] };

function nextSortParams(currentSort: string | null, currentOrder: string | null, field: string) {
  if (currentSort !== field) return { sort: field, order: null as any };
  if (currentSort === field && currentOrder !== 'desc') return { sort: field, order: 'desc' };
  return { sort: null as any, order: null as any };
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const headerCell = (label: string, field: 'name' | 'sex' | 'born' | 'died') => {
    const next = nextSortParams(sort, order, field);
    const isActive = sort === field;
    const isDesc = isActive && order === 'desc';

    return (
      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          {label}
          <SearchLink className="ml-2" params={next}>
            <span className="icon">
              <i className={`fas ${!isActive ? 'fa-sort' : isDesc ? 'fa-sort-down' : 'fa-sort-up'}`} />
            </span>
          </SearchLink>
        </span>
      </th>
    );
  };

  return (
    <table data-cy="peopleTable" className="table is-striped is-hoverable is-narrow is-fullwidth">
      <thead>
      <tr>
        {headerCell('Name', 'name')}
        {headerCell('Sex', 'sex')}
        {headerCell('Born', 'born')}
        {headerCell('Died', 'died')}
        <th>Mother</th>
        <th>Father</th>
      </tr>
      </thead>

      <tbody>
      {people.map(p => (
        <tr key={p.slug} data-cy="person">
          <td><a href={`#/people/${p.slug}`}>{p.name}</a></td>
          <td>{p.sex}</td>
          <td>{p.born}</td>
          <td>{p.died}</td>
          <td>
            {p.motherName ? (
              <a className="has-text-danger" href={`#/people/${p.mother?.slug || ''}`}>
                {p.motherName}
              </a>
            ) : ('—')}
          </td>
          <td>
            {p.fatherName ? (
              <a href={`#/people/${p.father?.slug || ''}`}>
                {p.fatherName}
              </a>
            ) : ('—')}
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};
