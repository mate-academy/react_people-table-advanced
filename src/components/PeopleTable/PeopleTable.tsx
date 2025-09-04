import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import React from 'react';

interface Props {
  people: Person[];
  highlightedSlug?: string;
  sortField?: keyof Person;
  sortOrder?: 'asc' | 'desc';
  onSort?: (field: keyof Person) => void;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  highlightedSlug,
  sortField,
  sortOrder,
  onSort,
}) => {
  const renderSortIcon = (field: keyof Person) => {
    if (sortField === field) {
      return sortOrder === 'desc' ? (
        <i className="fas fa-sort-down" />
      ) : (
        <i className="fas fa-sort-up" />
      );
    }

    return <i className="fas fa-sort" />;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => onSort && onSort('name')}
              style={{ cursor: 'pointer' }}
            >
              Name<span className="icon">{renderSortIcon('name')}</span>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => onSort && onSort('sex')}
              style={{ cursor: 'pointer' }}
            >
              Sex<span className="icon">{renderSortIcon('sex')}</span>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => onSort && onSort('born')}
              style={{ cursor: 'pointer' }}
            >
              Born<span className="icon">{renderSortIcon('born')}</span>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => onSort && onSort('died')}
              style={{ cursor: 'pointer' }}
            >
              Died<span className="icon">{renderSortIcon('died')}</span>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              person.slug === highlightedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink person={person} name={person.name} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink person={person.mother} name={person.motherName} />
            </td>
            <td>
              <PersonLink person={person.father} name={person.fatherName} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
