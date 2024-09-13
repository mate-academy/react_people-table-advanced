import React from 'react';
import { Person } from '../types/Person';

interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
  onSort: (field: keyof Person) => void;
  sortOrder: string | null;
  sortField: 'asc' | 'desc' | null;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedSlug,
  onSort,
  sortOrder,
  sortField,
}) => {
  const findPersonSlug = (
    name: string | null | undefined,
    persons: Person[],
  ): string | undefined => {
    const foundPerson = persons.find(person => person.name === name);

    return foundPerson ? foundPerson.slug : undefined;
  };

  const getSortIcon = (field: keyof Person) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? (
        <i className="fas fa-sort-up" />
      ) : (
        <i className="fas fa-sort-down" />
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
          <th onClick={() => onSort('name')}>Name {getSortIcon('name')}</th>
          <th onClick={() => onSort('sex')}>Sex {getSortIcon('sex')}</th>
          <th onClick={() => onSort('born')}>Born{getSortIcon('born')}</th>
          <th onClick={() => onSort('died')}>Died {getSortIcon('died')}</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const motherSlug = findPersonSlug(person.motherName, people);
          const fatherSlug = findPersonSlug(person.fatherName, people);

          return (
            <tr
              key={person.slug}
              className={
                person.slug === selectedSlug ? 'has-background-warning' : ''
              }
              data-cy="person"
            >
              <td>
                <a
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                  href={`#/people/${person.slug}`}
                >
                  {person.name}
                </a>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  motherSlug ? (
                    <a
                      href={`#/people/${motherSlug}`}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </a>
                  ) : (
                    <span>{person.motherName}</span>
                  )
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  fatherSlug ? (
                    <a href={`#/people/${fatherSlug}`}>{person.fatherName}</a>
                  ) : (
                    <span>{person.fatherName}</span>
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
