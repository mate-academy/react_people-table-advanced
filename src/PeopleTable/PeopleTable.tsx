import React from 'react';
import { Person } from '../types/Person';
import { useSearchParams } from 'react-router-dom';

interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
  onSort: (field: keyof Person) => void;
  sortOrder: 'asc' | 'desc' | null;
  sortField: keyof Person | null;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedSlug,
  onSort,
  sortOrder,
  sortField,
}) => {
  const [searchParams] = useSearchParams();

  const findPersonSlug = (
    name: string | null | undefined,
    persons: Person[],
  ): string | undefined => {
    return persons.find(person => person.name === name)?.slug;
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

  const searchParamsString = searchParams.toString(); // Get the current search params as a string

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => onSort('name')}>Name {getSortIcon('name')}</th>
          <th onClick={() => onSort('sex')}>Sex {getSortIcon('sex')}</th>
          <th onClick={() => onSort('born')}>Born {getSortIcon('born')}</th>
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
                  href={`#/people/${person.slug}?${searchParamsString}`}
                >
                  {person.name}
                </a>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {motherSlug ? (
                  <a
                    href={`#/people/${motherSlug}?${searchParamsString}`}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </a>
                ) : (
                  <span>{person.motherName || '-'}</span>
                )}
              </td>

              <td>
                {fatherSlug ? (
                  <a href={`#/people/${fatherSlug}?${searchParamsString}`}>
                    {person.fatherName}
                  </a>
                ) : (
                  <span>{person.fatherName || '-'}</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
