import React from 'react';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
  sortField?: keyof Person;
  sortOrder?: 'asc' | 'desc';
  onSort?: (field: keyof Person) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  sortField,
  sortOrder,
  onSort,
}) => {
  const renderSortArrow = (field: keyof Person) => {
    if (sortField !== field) {
      return null;
    }

    return sortOrder === 'asc' ? ' ▲' : sortOrder === 'desc' ? ' ▼' : null;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => onSort?.('name')}>
            Name{renderSortArrow('name')}
          </th>
          <th onClick={() => onSort?.('sex')}>Sex{renderSortArrow('sex')}</th>
          <th onClick={() => onSort?.('born')}>
            Born{renderSortArrow('born')}
          </th>
          <th onClick={() => onSort?.('died')}>
            Died{renderSortArrow('died')}
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName) || null;
          const father = people.find(p => p.name === person.fatherName) || null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                person.slug === selectedSlug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  father ? (
                    <PersonLink person={father} />
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
