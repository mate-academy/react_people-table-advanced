import React from 'react';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import sortBoth from '/public/sort_both.png';
import sortAsc from '/public/sort_asc.png';
import sortDesc from '/public/sort_desc.png';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  people: Person[];
  selectedPersonSlug?: string;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getNextSort = (field: string): [string | null, string | null] => {
    if (sort !== field) {
      return [field, null];
    }

    if (!order) {
      return [field, 'desc'];
    }

    return [null, null];
  };

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return sortBoth;
    }

    if (order === 'desc') {
      return sortDesc;
    }

    return sortAsc;
  };

  const sortedPeople = [...people];

  if (sort) {
    sortedPeople.sort((a, b) => {
      const valA = (a as any)[sort];
      const valB = (b as any)[sort];

      if (valA < valB) {
        return order === 'desc' ? 1 : -1;
      }

      if (valA > valB) {
        return order === 'desc' ? -1 : 1;
      }

      return 0;
    });
  }

  return (
    <div className="block">
      <div className="box table-container">
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {['name', 'sex', 'born', 'died'].map(field => {
                const [nextSort, nextOrder] = getNextSort(field);

                return (
                  <th key={field}>
                    <SearchLink
                      params={getSearchWith(searchParams, {
                        sort: nextSort,
                        order: nextOrder,
                      })}
                    >
                      <img
                        src={getSortIcon(field)}
                        alt="sort"
                        style={{ width: '10px', marginRight: '5px' }}
                      />
                      {field[0].toUpperCase() + field.slice(1)}
                    </SearchLink>
                  </th>
                );
              })}
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {sortedPeople.map(person => {
              const isSelected = person.slug === selectedPersonSlug;

              return (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={isSelected ? 'has-background-warning' : undefined}
                >
                  <td>
                    <PersonLink person={person} people={people} />
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.motherName ? (
                      <PersonLink
                        person={
                          people.find(p => p.name === person.motherName) || {
                            ...person,
                            name: person.motherName,
                            slug: person.motherName,
                            sex: 'f',
                          }
                        }
                        people={people}
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {person.fatherName ? (
                      <PersonLink
                        person={
                          people.find(p => p.name === person.fatherName) || {
                            ...person,
                            name: person.fatherName,
                            slug: person.fatherName,
                            sex: 'm',
                          }
                        }
                        people={people}
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
