/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  persons: Person[];
};

export const PeopleTable = ({ persons }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function getSortIcon(columnKey: string) {
    const isCurrent = searchParams.get('sort') === columnKey;
    const order = searchParams.get('order');

    return cn('fas', {
      'fa-sort': !isCurrent,
      'fa-sort-up': isCurrent && order === 'asc',
      'fa-sort-down': isCurrent && order === 'desc',
    });
  }

  function handleSort(columnKey: string) {
    const params = new URLSearchParams(searchParams);
    const currentSort = params.get('sort');
    const currentOrder = params.get('order');

    if (currentSort !== columnKey) {
      params.set('sort', columnKey);
      params.set('order', 'asc');
    } else if (currentOrder === 'asc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  }

  /* eslint-disable */

  /* eslint-disable */

  const SortableHeader = ({
    label,
    columnKey,
  }: {
    label: string;
    columnKey: string;
  }) => (
    <th onClick={() => handleSort(columnKey)} style={{ cursor: 'pointer' }}>
      <span className="is-flex is-flex-wrap-nowrap">
        {label}
        <span className="icon">
          <i className={getSortIcon(columnKey)} />
        </span>
      </span>
    </th>
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <SortableHeader label="Name" columnKey="name" />
          <SortableHeader label="Sex" columnKey="sex" />
          <SortableHeader label="Born" columnKey="born" />
          <SortableHeader label="Died" columnKey="died" />
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {persons.map(person => (
          <PersonLink key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
