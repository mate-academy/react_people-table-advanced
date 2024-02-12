import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { TableHeadItem } from '../TableHeadItem/TableHeadItem';
import { TableBody } from '../TableBody/TableBody';
import { preparePeople } from '../services/preparePeople';

interface Props {
  people: Person[]
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filteredPeople = preparePeople(people, {
    sex,
    query,
    centuries,
    sort,
    order,
  });

  return (
    (filteredPeople.length === 0) ? (
      <p>There are no people matching the current search criteria</p>
    ) : (
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <TableHeadItem />

        <TableBody
          people={people}
          filteredPeople={filteredPeople}
        />
      </table>
    )
  );
};
