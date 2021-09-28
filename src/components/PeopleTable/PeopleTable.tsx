import React from 'react';
import cn from 'classnames';

import { PersonRow } from '../PersonRow/PersonRow';

import './PeopleTable.scss';

interface Props {
  people: PersonWithParents[],
  personSlug: string | undefined,
  searchParams: any,
  sortBy: string,
  sortOrder: string,
  handleSortChange: any,
}

export const PeopleTable: React.FC<Props> = ({
  people,
  personSlug,
  searchParams,
  sortBy,
  sortOrder,
  handleSortChange,
}) => (
  <table className="PeopleTable">
    <thead className="PeopleTable__head">
      <tr>
        <th className="head-cell name">
          <button
            className={cn(
              'button',
              { 'button-active': sortBy === 'name' },
            )}
            type="button"
            onClick={() => {
              handleSortChange('name');
            }}
          >
            <span className="button-text">Name</span>
            {sortBy !== 'name' && (<img src="./images/sort_both.png" alt="img" />)}
            {(sortBy === 'name' && sortOrder === 'asc')
            && (<img src="./images/sort_asc.png" alt="img" />)}
            {(sortBy === 'name' && sortOrder === 'desc')
            && (<img src="./images/sort_desc.png" alt="img" />)}
          </button>
        </th>
        <th className="head-cell sex">
          <button
            className={cn(
              'button',
              { 'button-active': sortBy === 'sex' },
            )}
            type="button"
            onClick={() => {
              handleSortChange('sex');
            }}
          >
            <span className="button-text">Sex</span>
            {sortBy !== 'sex' && (<img src="./images/sort_both.png" alt="img" />)}
            {(sortBy === 'sex' && sortOrder === 'asc')
            && (<img src="./images/sort_asc.png" alt="img" />)}
            {(sortBy === 'sex' && sortOrder === 'desc')
            && (<img src="./images/sort_desc.png" alt="img" />)}
          </button>
        </th>
        <th className="head-cell born">
          <button
            className={cn(
              'button',
              { 'button-active': sortBy === 'born' },
            )}
            type="button"
            onClick={() => {
              handleSortChange('born');
            }}
          >
            <span className="button-text">Born</span>
            {sortBy !== 'born' && (<img src="./images/sort_both.png" alt="img" />)}
            {(sortBy === 'born' && sortOrder === 'asc')
            && (<img src="./images/sort_asc.png" alt="img" />)}
            {(sortBy === 'born' && sortOrder === 'desc')
            && (<img src="./images/sort_desc.png" alt="img" />)}
          </button>
        </th>
        <th className="head-cell died">
          <button
            className={cn(
              'button',
              { 'button-active': sortBy === 'died' },
            )}
            type="button"
            onClick={() => {
              handleSortChange('died');
            }}
          >
            <span className="button-text">Died</span>
            {sortBy !== 'died' && (<img src="./images/sort_both.png" alt="img" />)}
            {(sortBy === 'died' && sortOrder === 'asc')
            && (<img src="./images/sort_asc.png" alt="img" />)}
            {(sortBy === 'died' && sortOrder === 'desc')
            && (<img src="./images/sort_desc.png" alt="img" />)}
          </button>
        </th>
        <th className="head-cell mother">Mother</th>
        <th className="head-cell father">Father</th>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <PersonRow
          key={person.id}
          {...{ person }}
          personSlug={personSlug}
          searchParams={searchParams}
        />
      ))}
    </tbody>
  </table>
);
