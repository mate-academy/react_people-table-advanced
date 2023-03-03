import React from 'react';
import { useParams } from 'react-router-dom';
import { PersonInfo } from '../PersonInfo/PersonInfo';
import { TableHeaderWithSortIcon } from '../TableHeaderWithSortIcon';
import { PeopleTableProps } from './PeopleTableProps';

export const PeopleTable: React.FC<PeopleTableProps> = React.memo(({
  list,
}) => {
  const { personSlug = '' } = useParams();

  const TableHeaderWithSortIconArray = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TableHeaderWithSortIconArray.map(th => (
            <TableHeaderWithSortIcon th={th} key={th} />
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {list.length ? list.map(person => (
          <PersonInfo
            person={person}
            selectedSlug={personSlug}
            key={person.slug}
          />
        )) : (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
      </tbody>
    </table>
  );
});
