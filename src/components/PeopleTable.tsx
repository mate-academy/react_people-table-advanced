/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { PersonLink } from './personLink';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

interface PeopleTableProps {
  people: Person[];
  sortField: string | null;
  sortOrder: string | null;
  onSortChange: (field: string) => void;
}
export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  sortField,
  sortOrder,
  onSortChange,
}) => {
  const { slug } = useParams();

  const findParentInTable = (parentName: string | null) => {
    return people.find(person => person.name === parentName);
  };

  const getSortIcon = (field: string) => {
    if (sortField === field) {
      if (sortOrder === 'asc') {
        return <i className="fa-solid fa-sort-up"></i>;
      } else if (sortOrder === 'desc') {
        return <i className="fa-solid fa-sort-down"></i>;
      }
    }

    return <i className="fa-solid fa-sort"></i>;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => onSortChange('name')}>
            Name{getSortIcon('name')}
          </th>
          <th onClick={() => onSortChange('sex')}>Sex{getSortIcon('sex')}</th>
          <th onClick={() => onSortChange('born')}>
            Born{getSortIcon('born')}
          </th>
          <th onClick={() => onSortChange('died')}>
            Died{getSortIcon('died')}
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = findParentInTable(person.motherName);
          const father = findParentInTable(person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({ 'has-background-warning': slug === person.slug })}
            >
              <PersonLink person={person} />

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              {mother ? (
                <PersonLink person={mother} />
              ) : (
                <td>{person.motherName || '-'}</td>
              )}

              {father ? (
                <PersonLink person={father} />
              ) : (
                <td>{person.fatherName || '-'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
