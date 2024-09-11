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

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => onSort('name')}>
            Name
            {sortField === 'name' ? (
              <>
                {sortOrder === 'asc' ? (
                  <i className="fas fa-sort-up" />
                ) : (
                  <i className="fas fa-sort-down" />
                )}
              </>
            ) : (
              <>
                <i className="fas fa-sort" />
              </>
            )}
          </th>
          <th onClick={() => onSort('sex')}>
            Sex
            {sortField === 'sex' ? (
              <>
                {sortOrder === 'asc' ? (
                  <i className="fas fa-sort-up" />
                ) : (
                  <i className="fas fa-sort-down" />
                )}
              </>
            ) : (
              <>
                <i className="fas fa-sort" />
              </>
            )}
          </th>
          <th onClick={() => onSort('born')}>
            Born
            {sortField === 'born' ? (
              <>
                {sortOrder === 'asc' ? (
                  <i className="fas fa-sort-up" />
                ) : (
                  <i className="fas fa-sort-down" />
                )}
              </>
            ) : (
              <>
                <i className="fas fa-sort" />
              </>
            )}
          </th>
          <th onClick={() => onSort('died')}>
            Died
            {sortField === 'died' ? (
              <>
                {sortOrder === 'asc' ? (
                  <i className="fas fa-sort-up" />
                ) : (
                  <i className="fas fa-sort-down" />
                )}
              </>
            ) : (
              <>
                <i className="fas fa-sort" />
              </>
            )}
          </th>
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
