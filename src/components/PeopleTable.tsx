import React from 'react';
import { Person } from '../types';
import PeopleLink from './PeopleLink';
import { filterPeople } from '../utils/sortHelper';
import { SortTable } from '../types/Filter';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
  query: string;
  sex: string;
  centuries: number[];
  sortBy: string | null;
  sortOrder: string | null;
};

export const PeopleTable: React.FC<Props> = props => {
  const { people, query, sex, centuries, sortBy, sortOrder, } = props;

  const filteredPeople = filterPeople(people, {
    sortBy,
    sortOrder,
    query,
    sex,
    centuries,
  });

  return (
    <div className="block">
      <div className="box table-container">
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {Object.values(SortTable).map(table => (
                <th key={table}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {table}
                    <SearchLink
                      params={
                        sortBy === table && sortOrder === 'asc'
                          ? { sortBy: table, sortOrder: 'desc' }
                          : sortBy === table && sortOrder === 'desc'
                            ? { sortBy: null, sortOrder: null }
                            : { sortBy: table, sortOrder: 'asc' }
                      }
                    >
                      <span className="icon">
                        <i
                          data-cy="SortIcon"
                          className={classNames('fas', {
                            'fa-sort': sortBy !== table || !sortOrder,
                            'fa-sort-up':
                              sortBy === table && sortOrder === 'asc',
                            'fa-sort-down':
                              sortBy === table && sortOrder === 'desc',
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>
              ))}
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {filteredPeople.map(person => (
              <PeopleLink key={person.slug} person={person} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
