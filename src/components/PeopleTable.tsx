import React from 'react';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { findParent } from '../utils/findParents';
import { SearchLink } from './SearchLink';
import { SortOptions } from '../types/SortOptions';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';

  const getNextOrder = (order: string): string => {
    if (order === 'asc') {
      return 'desc';
    }

    if (order === 'desc') {
      return '';
    }

    return 'asc';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortOptions).map(option => {
            const isActiveColumn = currentSort === option.toLowerCase();
            const isSortedAsc = isActiveColumn && currentOrder === 'asc';
            const isSortedDesc = isActiveColumn && currentOrder === 'desc';

            return (
              <th key={option}>
                <SearchLink
                  params={{
                    sort: getNextOrder(currentOrder)
                      ? option.toLowerCase()
                      : null,
                    order: getNextOrder(currentOrder) || null,
                  }}
                >
                  <span className="is-flex is-flex-wrap-nowrap">
                    {option}
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': !isActiveColumn || currentOrder === '',
                          'fa-sort-up': isSortedAsc,
                          'fa-sort-down': isSortedDesc,
                        })}
                      />
                    </span>
                  </span>
                </SearchLink>
              </th>
            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(p => (
          <tr
            data-cy="person"
            key={p.slug}
            className={cn({ 'has-background-warning': slug === p.slug })}
          >
            <td>
              <Link
                to={`../${[p.slug]}`}
                className={cn({ 'has-text-danger': p.sex === 'f' })}
              >
                {p.name}
              </Link>
            </td>

            <td>{p.sex}</td>
            <td>{p.born}</td>
            <td>{p.died}</td>
            <td>{p.motherName ? findParent(p.motherName, people) : '-'}</td>
            <td>{p.fatherName ? findParent(p.fatherName, people) : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
