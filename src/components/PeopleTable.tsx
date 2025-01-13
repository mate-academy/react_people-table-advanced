// components/PeopleTable.tsx

import React, { FC } from 'react';
import { Person } from '../types/Person';
import { SearchParams } from '../utils/searchHelper';

interface PeopleTableProps {
  people: Person[];
  searchParams: URLSearchParams;
  updateSearchParams: (paramsToUpdate: SearchParams) => void;
}

function getSlug(person: Person): string {
  return person.name.toLowerCase().replace(/\s+/g, '-') + '-' + person.born;
}

export const PeopleTable: FC<PeopleTableProps> = ({
  people,
  searchParams,
  updateSearchParams,
}) => {
  const handleSort = (field: keyof Person) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== field) {
      // Якщо сортування по новому полю, встановлюємо сортування за зростанням
      updateSearchParams({ sort: field, order: 'asc' });
    } else {
      // Якщо вже сортування по цьому полю, змінюємо порядок
      if (currentOrder === 'asc') {
        updateSearchParams({ order: 'desc' });
      } else if (currentOrder === 'desc') {
        // Вимикаємо сортування
        updateSearchParams({ sort: null, order: null });
      } else {
        // Якщо немає сортування, встановлюємо за зростанням
        updateSearchParams({ order: 'asc' });
      }
    }
  };

  const getSortIndicator = (field: keyof Person) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== field) {
      return null;
    }

    if (currentOrder === 'asc') {
      return '↑';
    }

    if (currentOrder === 'desc') {
      return '↓';
    }

    return null;
  };

  return (
    <div className="block">
      <div className="box table-container">
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                Name{getSortIndicator('name')}
              </th>
              <th onClick={() => handleSort('sex')}>
                Sex{getSortIndicator('sex')}
              </th>
              <th onClick={() => handleSort('born')}>
                Born{getSortIndicator('born')}
              </th>
              <th onClick={() => handleSort('died')}>
                Died{getSortIndicator('died')}
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map(person => {
              const personSlug = getSlug(person);

              const currentHash = window.location.hash;
              const isSelected = currentHash === `#/people/${personSlug}`;

              let motherCell: React.ReactNode = '-';

              if (person.motherName) {
                const mother = people.find(p => p.name === person.motherName);

                if (mother) {
                  const motherSlug = getSlug(mother);

                  motherCell = (
                    <a
                      href={`#/people/${motherSlug}`}
                      className={mother.sex === 'f' ? 'has-text-danger' : ''}
                    >
                      {mother.name}
                    </a>
                  );
                } else {
                  motherCell = person.motherName;
                }
              }

              let fatherCell: React.ReactNode = '-';

              if (person.fatherName) {
                const father = people.find(p => p.name === person.fatherName);

                if (father) {
                  const fatherSlug = getSlug(father);

                  fatherCell = (
                    <a
                      href={`#/people/${fatherSlug}`}
                      // Видаляємо клас 'has-text-danger' для посилань на батьків
                    >
                      {father.name}
                    </a>
                  );
                } else {
                  fatherCell = person.fatherName;
                }
              }

              const nameLink = (
                <a
                  href={`#/people/${personSlug}`}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </a>
              );

              return (
                <tr
                  key={personSlug}
                  data-cy="person"
                  className={isSelected ? 'has-background-warning' : ''}
                >
                  <td>{nameLink}</td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>{motherCell}</td>
                  <td>{fatherCell}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
