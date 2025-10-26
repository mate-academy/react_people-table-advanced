/* eslint-disable @typescript-eslint/indent */
import { Link, useLocation } from 'react-router-dom';
import { PersonRow } from './PersonRow';
import React from 'react';
import { Person } from '../types/Person/Person';
import classNames from 'classnames';
import { SORTING, SortOrder } from '../types/SortOrder';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  visiblePeople: Person[];
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
};

export const PeopleTable: React.FC<Props> = ({
  visiblePeople,
  sortOrder,
  setSortOrder,
  searchParams,
  setSearchParams,
}) => {
  const location = useLocation();
  const handleParams = (isDesc: boolean, params: URLSearchParams) => {
    if (isDesc) {
      params.set('order', 'desc');
    } else {
      params.delete('order');
    }
  };

  const setFilter = (column: keyof SortOrder) => {
    const nextOrder =
      sortOrder[column] === 'asc'
        ? 'desc'
        : sortOrder[column] === 'desc'
          ? undefined
          : 'asc';

    setSortOrder({
      name: column === 'name' ? nextOrder : undefined,
      sex: column === 'sex' ? nextOrder : undefined,
      born: column === 'born' ? nextOrder : undefined,
      died: column === 'died' ? nextOrder : undefined,
    });

    const params = new URLSearchParams(searchParams);

    if (nextOrder) {
      params.set('sort', column);

      handleParams(nextOrder === 'desc', params);
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const nextOrderFor = (col: keyof SortOrder): 'asc' | 'desc' | undefined => {
    if (sortOrder[col] === undefined) {
      return 'asc';
    }

    if (sortOrder[col] === 'asc') {
      return 'desc';
    }

    return undefined; // było 'desc'
  };

  const getSortUrl = (column: keyof SortOrder) => {
    const params = new URLSearchParams(searchParams);
    const next = nextOrderFor(column);

    if (!next) {
      params.delete('sort');
      params.delete('order');
    } else {
      params.set('sort', column);
      if (next === 'desc') {
        params.set('order', 'desc');
      } else {
        params.delete('order');
      } // asc = brak 'order'
    }

    return `${location.pathname}?${params.toString()}`;
  };

  const getIconClass = (column: keyof SortOrder) => {
    return classNames('fas', {
      'fa-sort': sortOrder[column] === undefined,
      'fa-sort-up': sortOrder[column] === 'asc',
      'fa-sort-down': sortOrder[column] === 'desc',
    });
  };

  const COLUMNS = Object.values(SORTING) as Array<keyof SortOrder>;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map(key => (
            <th key={key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key.charAt(0).toUpperCase() + key.slice(1)}
                <Link
                  to={getSortUrl(key)}
                  onClick={() => {
                    setFilter(key);
                  }}
                >
                  <span className="icon">
                    <i className={getIconClass(key)} />
                  </span>
                </Link>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          return <PersonRow key={person.slug} person={person} />;
        })}
      </tbody>
    </table>
  );
};
