import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import './PeopleTable.scss';

import PersonRow from '../PersonRow';

import PersonEnum from '../../enums/PersonEnum';
import getSearchWith from '../../utils/getSearchWith';

type Props = {
  people: Person[];
};

const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortOrder = searchParams.get('sortOrder');
  const sortBy = searchParams.get('sortBy');

  const handleSortChange = (sortByQuery: PersonEnum | '') => {
    let appliedSortOrder = sortOrder;

    if (sortBy !== sortByQuery) {
      appliedSortOrder = 'desc';
    }

    setSearchParams(getSearchWith({
      sortBy: sortByQuery,
      sortOrder: appliedSortOrder === 'asc' ? 'desc' : 'asc',
    }, searchParams));
  };

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
            onClick={() => handleSortChange('')}
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
            onClick={() => handleSortChange(PersonEnum.Name)}
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
            onClick={() => handleSortChange(PersonEnum.Sex)}
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
            onClick={() => handleSortChange(PersonEnum.Born)}
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
            onClick={() => handleSortChange(PersonEnum.Died)}
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
