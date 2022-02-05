import React from 'react';
import { PersonRow } from '../PersonRow/PersonRow';
import './PeopleTable.scss';

type Props = {
  visiblePeople: Person[],
  handleSortChange: (event: React.MouseEvent<HTMLElement>) => void,
};

export const PeopleTable: React.FC<Props> = ({ visiblePeople, handleSortChange }) => {
  return (
    <div className="container">
      <table className="table table-striped table-hover table-responsive">
        <thead>
          <tr>
            <th className="table__title" onClick={handleSortChange}>Name</th>
            <th className="table__title" onClick={handleSortChange}>Sex</th>
            <th className="table__title" onClick={handleSortChange}>Born</th>
            <th className="table__title" onClick={handleSortChange}>Died</th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
        <tbody>
          {visiblePeople.map(person => (
            <PersonRow person={person} key={person.slug} visiblePeople={visiblePeople} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
