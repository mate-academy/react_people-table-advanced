import PersonLink from './PersonLink';
import { Person } from './../types/Person';
import { PeopleMap } from '../types/PeopleMap';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import React from 'react';

type TableColumn = {
  column: string;
  sortable: boolean;
};

type TableColumns = {
  [property in keyof Partial<Person>]: TableColumn;
};

const TABLE_COLUMNS: TableColumns = {
  name: { column: 'Name', sortable: true },
  sex: { column: 'Sex', sortable: true },
  born: { column: 'Born', sortable: true },
  died: { column: 'Died', sortable: true },
  motherName: { column: 'Mother', sortable: false },
  fatherName: { column: 'Father', sortable: false },
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({
  people,
  selectedPerson,
  peopleMap,
  onArrowClick,
  sortColumn,
  sortDirection,
}: {
  people: Person[];
  selectedPerson?: string | null;
  peopleMap: PeopleMap;
  onArrowClick: (column: string) => SearchParams;
  sortColumn: keyof Person | null;
  sortDirection: boolean;
}) => {
  const shouldHighlightUser = (slug: string) =>
    selectedPerson === slug ? 'has-background-warning' : '';
  // TODO class needs to receive the sort

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(TABLE_COLUMNS).map(([key, { column, sortable }]) => {
            const isSortedColumn = sortColumn === key;

            const sortIcon = isSortedColumn
              ? sortDirection
                ? 'fa-sort-down'
                : 'fa-sort-up'
              : 'fa-sort';

            return (
              <th key={column}>
                <span
                  className="is-flex is-flex-wrap-nowrap"
                  onClick={sortable ? () => onArrowClick(key) : undefined}
                  style={{ cursor: sortable ? 'pointer' : 'default' }}
                >
                  {column}
                  {sortable && (
                    <SearchLink params={onArrowClick(column.toLowerCase())}>
                      <span className="icon">
                        <i className={`fas ${sortIcon}`} />
                      </span>
                    </SearchLink>
                  )}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={shouldHighlightUser(person.slug)}
          >
            {Object.keys(TABLE_COLUMNS).map(key => {
              const { [key as keyof Person]: value } = person;
              const finalValue = !!value ? value : '-';

              const finalPerson = peopleMap[value as string];

              return (
                <td key={`${person.slug}${key}`}>
                  {finalPerson ? (
                    <PersonLink person={finalPerson} />
                  ) : (
                    <>{finalValue}</>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
