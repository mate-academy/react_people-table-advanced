import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import './PeopleTable.scss';

import PersonRow from '../PersonRow';

import PersonEnum from '../../enums/PersonEnum';

type Props = {
  people: Person[];
  onSortChange: (sortBy: PersonEnum | '') => void;
};

const PeopleTable: React.FC<Props> = ({
  people,
  onSortChange,
}) => {
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
            onClick={() => onSortChange('')}
          >
            #
          </th>

          <th
            className={classNames({
              'PeopleTable__header-row': true,
              sortable: true,
              'sortable--asc':
              sortOrder === 'asc' && sortBy === PersonEnum.Name,
              'sortable--desc':
              sortOrder === 'desc' && sortBy === PersonEnum.Name,
            })}
            scope="col"
            onClick={() => onSortChange(PersonEnum.Name)}
          >
            Name
          </th>

          <th
            className={classNames({
              'PeopleTable__header-row': true,
              sortable: true,
              'sortable--asc':
              sortOrder === 'asc' && sortBy === PersonEnum.Sex,
              'sortable--desc':
              sortOrder === 'desc' && sortBy === PersonEnum.Sex,
            })}
            scope="col"
            onClick={() => onSortChange(PersonEnum.Sex)}
          >
            Sex
          </th>

          <th
            className={classNames({
              'PeopleTable__header-row': true,
              sortable: true,
              'sortable--asc':
              sortOrder === 'asc' && sortBy === PersonEnum.Born,
              'sortable--desc':
              sortOrder === 'desc' && sortBy === PersonEnum.Born,
            })}
            scope="col"
            onClick={() => onSortChange(PersonEnum.Born)}
          >
            Born
          </th>

          <th
            className={classNames({
              'PeopleTable__header-row': true,
              sortable: true,
              'sortable--asc':
              sortOrder === 'asc' && sortBy === PersonEnum.Died,
              'sortable--desc':
              sortOrder === 'desc' && sortBy === PersonEnum.Died,
            })}
            scope="col"
            onClick={() => onSortChange(PersonEnum.Died)}
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
