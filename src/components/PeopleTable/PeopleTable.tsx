import React from 'react';
import { PeopleTableBody } from '../PeopleTableBody';
import { TableHeaders } from '../TableHeaders';
import { Person } from '../../types';

type Props = {
  people: Person[],
  sort: string,
  order: string,
  onSortBy: (sortType: string) => {
    sort: string;
    order: null;
  } | {
    sort: string;
    order: string;
  } | {
    sort: null;
    order: null;
  }
};

export const PeopleTable: React.FC<Props> = ({
  people,
  sort,
  order,
  onSortBy,
}) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <TableHeaders
        sort={sort}
        order={order}
        onSortBy={onSortBy}
      />
    </thead>

    <PeopleTableBody people={people} />
  </table>
);
