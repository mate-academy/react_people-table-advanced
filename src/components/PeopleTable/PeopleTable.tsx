import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import './PeopleTable.scss';

import PersonRow from '../PersonRow';

import SortBy from '../../enums/SortBy';

type Props = {
  people: Person[];
  onSortChange: (sortBy: SortBy) => void;
};

const PeopleTable: React.FC<Props> = ({ people, onSortChange }) => {
  const [searchParams] = useSearchParams();

  const sortOrder = searchParams.get('sortOrder');
  const sortBy = searchParams.get('sortBy');

  return (
    <table
      className="table table-striped"
      style={{ borderCollapse: 'collapse' }}
    >
      <thead>
        <tr>
          <th
            className="PeopleTable__header-row"
            scope="col"
            onClick={() => onSortChange(SortBy.None)}
          >
            #
          </th>

          <th
            className={classNames({
              'PeopleTable__header-row': true,
              sortable: true,
              'sortable--asc':
                sortOrder === 'asc' && sortBy === SortBy.Name,
              'sortable--desc':
                sortOrder === 'desc' && sortBy === SortBy.Name,
            })}
            scope="col"
            onClick={() => onSortChange(SortBy.Name)}
          >
            Name
          </th>

          <th
            className={classNames({
              'PeopleTable__header-row': true,
              sortable: true,
              'sortable--asc':
                sortOrder === 'asc' && sortBy === SortBy.Sex,
              'sortable--desc':
                sortOrder === 'desc' && sortBy === SortBy.Sex,
            })}
            scope="col"
            onClick={() => onSortChange(SortBy.Sex)}
          >
            Sex
          </th>

          <th
            className={classNames({
              'PeopleTable__header-row': true,
              sortable: true,
              'sortable--asc':
                sortOrder === 'asc' && sortBy === SortBy.Born,
              'sortable--desc':
                sortOrder === 'desc' && sortBy === SortBy.Born,
            })}
            scope="col"
            onClick={() => onSortChange(SortBy.Born)}
          >
            Born
          </th>

          <th
            className={classNames({
              'PeopleTable__header-row': true,
              sortable: true,
              'sortable--asc':
                sortOrder === 'asc' && sortBy === SortBy.Died,
              'sortable--desc':
                sortOrder === 'desc' && sortBy === SortBy.Died,
            })}
            scope="col"
            onClick={() => onSortChange(SortBy.Died)}
          >
            Died
          </th>

          <th
            className="PeopleTable__header-row"
            scope="col"
          >
            Mother
          </th>

          <th
            className="PeopleTable__header-row"
            scope="col"
          >
            Father
          </th>
        </tr>
      </thead>

      <tbody>
        {people.map((person, i) => (
          <PersonRow
            key={person.slug}
            person={person}
            index={i + 1}
          />
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
