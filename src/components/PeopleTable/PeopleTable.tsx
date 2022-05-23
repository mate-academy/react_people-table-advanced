import React from 'react';
import { useParams } from 'react-router-dom';
import { People } from '../../types/people';
import PeopleRow from '../PeopleRow/PeopleRow';
import './PeopleTable.scss';

type Props = {
  filterPeople: People[],
  getSortTable: (sort:string) => void,
  sortOrder: string,
  selectedSort: string,
};

const PeopleTable: React.FC<Props> = ({
  filterPeople,
  getSortTable,
  sortOrder,
  selectedSort,
}) => {
  const { slug } = useParams<{ slug: string }>();

  const changeArrow = (value:string) => {
    if ((selectedSort === value) && sortOrder) {
      switch (sortOrder) {
        case 'asc':
          return '/images/sort_asc.png';
        case 'desc':
          return '/images/sort_desc.png';
        default:
          break;
      }
    }

    return './images/sort_both.png';
  };

  return (
    <table className="table table-border is-hoverable is-striped is-bordered">
      <thead>
        <tr>
          <th onClick={() => getSortTable('name')}>
            <span>Name</span>
            <img
              src={changeArrow('name')}
              alt="arrow"
              className="img"
            />
          </th>
          <th onClick={() => getSortTable('sex')}>
            <span>Sex</span>
            <img
              src={changeArrow('sex')}
              alt="arrow"
              className="img"
            />
          </th>
          <th onClick={() => getSortTable('born')}>
            <span>Born</span>
            <img
              src={changeArrow('born')}
              alt="arrow"
              className="img"
            />
          </th>
          <th onClick={() => getSortTable('died')}>
            <span>Died</span>
            <img
              src={changeArrow('died')}
              alt="arrow"
              className="img"
            />
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {filterPeople.map(person => (
          <tr
            key={person.slug}
            className={`${(slug === person.slug) ? 'is-selected' : ''}`}
          >
            <PeopleRow
              person={person}
              selectedSort={selectedSort}
            />
          </tr>
        ))}
      </tbody>

    </table>
  );
};

export default PeopleTable;
