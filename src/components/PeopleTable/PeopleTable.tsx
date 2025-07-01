/* eslint-disable jsx-a11y/control-has-associated-label */

import { Person } from '../../types';
import { PersonItem } from '../PersonItem/PersonItem';
import { SortableNameColumn } from './SortableNameColumn';
import { ColumnsName } from '../../types/ColumnsName';
import { usePeopleTable } from '../../hooks/usePeopleTable';

interface PeopleTableProps {
  slugFromParam: Person['slug'] | undefined;
  visiblePeople: Person[];
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  slugFromParam,
  visiblePeople,
}) => {
  const { sortSearchParam, orderSearchParam } = usePeopleTable();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <SortableNameColumn
              columnName="Name"
              sortBy={ColumnsName.Name}
              currentSort={sortSearchParam}
              currentOrder={orderSearchParam}
            />
          </th>

          <th>
            <SortableNameColumn
              columnName="Sex"
              sortBy={ColumnsName.Sex}
              currentSort={sortSearchParam}
              currentOrder={orderSearchParam}
            />
          </th>

          <th>
            <SortableNameColumn
              columnName="Born"
              sortBy={ColumnsName.Born}
              currentSort={sortSearchParam}
              currentOrder={orderSearchParam}
            />
          </th>

          <th>
            <SortableNameColumn
              columnName="Died"
              sortBy={ColumnsName.Died}
              currentSort={sortSearchParam}
              currentOrder={orderSearchParam}
            />
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople?.map(person => {
          return (
            <PersonItem
              key={person.slug}
              person={person}
              slugFromParam={slugFromParam}
            />
          );
        })}
      </tbody>
    </table>
  );
};
