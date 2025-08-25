/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../types/Person';
import { useSearchParams, useLocation } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[]; // відфільтрований список для відображення
  allPeople?: Person[]; // повний список для резолву родичів (опційно)
};

type SortField = 'name' | 'sex' | 'born' | 'died';

function nextSortParams(
  currentSort: string | null,
  currentOrder: string | null,
  field: SortField,
) {
  if (currentSort !== field) {
    return { sort: field, order: null as unknown as string };
  }
  if (currentSort === field && currentOrder !== 'desc') {
    return { sort: field, order: 'desc' };
  }
  return { sort: null as unknown as string, order: null as unknown as string };
}

export const PeopleTable: React.FC<Props> = ({ people, allPeople }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const location = useLocation();
  const selectedSlug = location.pathname.startsWith('/people/')
    ? location.pathname.slice('/people/'.length)
    : null;

  // джерело правди для пошуку родичів
  const universe = allPeople ?? people;

  // знайти slug за точним ім'ям, якщо така людина є у даних
  const findSlugByName = (name?: string): string | null => {
    if (!name) return null;
    const found = universe.find(p => p.name === name);
    return found?.slug ?? null;
  };

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
        {people.map(p => {
          // визначаємо, чи є посилання для матері/батька
          const motherSlug = p.mother?.slug ?? findSlugByName(p.motherName);
          const fatherSlug = p.father?.slug ?? findSlugByName(p.fatherName);

          return (
            <tr
              key={p.slug}
              data-cy="person"
              className={
                p.slug === selectedSlug ? 'has-background-warning' : undefined
              }
            >
              <td>
                <a
                  href={`#/people/${p.slug}`}
                  className={p.sex === 'f' ? 'has-text-danger' : undefined}
                >
                  {p.name}
                </a>
              </td>

              <td>{p.sex}</td>
              <td>{p.born}</td>
              <td>{p.died}</td>

              {/* Mother: <a> лише якщо існує реальна людина зі slug; інакше текст */}
              <td>
                {p.motherName ? (
                  motherSlug ? (
                    <a
                      className="has-text-danger"
                      href={`#/people/${motherSlug}`}
                    >
                      {p.motherName}
                    </a>
                  ) : (
                    <span className="has-text-danger">{p.motherName}</span>
                  )
                ) : (
                  '-'
                )}
              </td>

              {/* Father: <a> лише якщо існує реальна людина зі slug; інакше текст */}
              <td>
                {p.fatherName ? (
                  fatherSlug ? (
                    <a href={`#/people/${fatherSlug}`}>{p.fatherName}</a>
                  ) : (
                    <span>{p.fatherName}</span>
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
