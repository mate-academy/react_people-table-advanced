import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface PeopleTableProps {
  people: Person[];
  selectedSlug: string | null;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedSlug,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const findPersonByName = (name: string | null) => {
    if (!name) {
      return null;
    }

    return people.find(p => p.name === name);
  };

  const getSortParams = (field: string) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return null;
    }

    return order === 'desc' ? ' ↓' : ' ↑';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <SearchLink params={getSortParams('name')}>
              Name{getSortIcon('name')}
            </SearchLink>
          </th>

          <th>
            <SearchLink params={getSortParams('sex')}>
              Sex{getSortIcon('sex')}
            </SearchLink>
          </th>

          <th>
            <SearchLink params={getSortParams('born')}>
              Born{getSortIcon('born')}
            </SearchLink>
          </th>

          <th>
            <SearchLink params={getSortParams('died')}>
              Died{getSortIcon('died')}
            </SearchLink>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = findPersonByName(person.motherName || null);
          const father = findPersonByName(person.fatherName || null);
          const isSelected = selectedSlug === person.slug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
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
