import classNames from 'classnames';
import { useState } from 'react';
import { Person } from '../types/Person';
import PersonRow from './PersonRow';
import './PeopleTable.scss';

type Props = {
  people: Person[];
  setSortParam: (value: string) => void;
  setSortOrder: (value: string) => void;
};

const PeopleTable: React.FC<Props> = ({
  people,
  setSortParam,
  setSortOrder,
}) => {
  const [sortOrderParam, setSortOrderParam] = useState('asc');
  const [sortName, setSortName] = useState('');

  function changeSortOrder(name: string) {
    setSortOrderParam(sortOrderParam === 'asc' ? 'desc' : 'asc');
    setSortOrder(sortOrderParam);
    setSortName(name);
    setSortParam(name);
  }

  return (
    <div className="">
      <table className="PeopleTable">
        <thead>
          <tr>
            <th
              onClick={() => changeSortOrder('name')}
              className={classNames('Table__sort', {
                'Table__sort--asc': sortName === 'name'
                && sortOrderParam === 'asc',
                'Table__sort--desc': sortName === 'name'
                && sortOrderParam === 'desc',
              })}
            >
              Name
            </th>
            <th
              onClick={() => changeSortOrder('sex')}
              className={classNames('Table__sort', {
                'Table__sort--asc': sortName === 'sex'
                && sortOrderParam === 'asc',
                'Table__sort--desc': sortName === 'sex'
                && sortOrderParam === 'desc',
              })}
            >
              Sex
            </th>
            <th
              onClick={() => changeSortOrder('born')}
              className={classNames('Table__sort', {
                'Table__sort--asc': sortName === 'born'
                && sortOrderParam === 'asc',
                'Table__sort--desc': sortName === 'born'
                && sortOrderParam === 'desc',
              })}
            >
              Born
            </th>
            <th
              onClick={() => changeSortOrder('died')}
              className={classNames('Table__sort', {
                'Table__sort--asc': sortName === 'died'
                && sortOrderParam === 'asc',
                'Table__sort--desc': sortName === 'died'
                && sortOrderParam === 'desc',
              })}
            >
              Died
            </th>
            <th>
              Mother
            </th>
            <th>
              Father
            </th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <PersonRow
              key={person.slug}
              person={person}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleTable;
