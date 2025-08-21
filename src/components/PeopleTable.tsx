import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');

  const getCentury = (wasBorn: number) => {
    return Math.floor((wasBorn - 1) / 100) + 1;
  };

  const filteredPeople = people.filter(person => {
    const matchesQuery = [person.name, person.fatherName, person.motherName]
      .filter(Boolean)
      .some(name => name?.toLowerCase().includes(query.toLowerCase()));

    const matchesSex = sex ? person.sex === sex : true;

    const century = getCentury(person.born);

    const matchesCentury =
      centuries.length > 0 ? centuries.includes(String(century)) : true;

    return matchesQuery && matchesSex && matchesCentury;
  });

  function toggleSort(field: string) {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    const params = new URLSearchParams(searchParams);

    if (currentSort !== field) {
      // Перше натискання: сортування за зростанням
      params.set('sort', field);
      params.delete('order');
    } else if (!currentOrder) {
      // Друге натискання: сортування за спаданням
      params.set('sort', field);
      params.set('order', 'desc');
    } else {
      // Третє натискання: прибрати сортування
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  }

  const sortKey = searchParams.get('sort');
  const sortOrder = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

  const sortedPeople = [...filteredPeople];

  if (sortKey) {
    sortedPeople.sort((a, b) => {
      let valueA = a[sortKey as keyof Person];
      let valueB = b[sortKey as keyof Person];

      if (valueA === null || valueA === undefined) {
        valueA = '';
      }

      if (valueB === null || valueB === undefined) {
        valueB = '';
      }

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
      }

      if (typeof valueB === 'string') {
        valueB = valueB.toLowerCase();
      }

      const compare = valueA > valueB ? 1 : valueA < valueB ? -1 : 0;

      return sortOrder === 'asc' ? compare : -compare;
    });
  }

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
              style={{ cursor: 'pointer' }}
              onClick={() => toggleSort('name')}
            >
              Name
              <span className="icon">
                <i
                  className={`fas ${
                    sortKey !== 'name'
                      ? 'fa-sort'
                      : sortOrder === 'asc'
                        ? 'fa-sort-up'
                        : 'fa-sort-down'
                  }`}
                />
              </span>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              style={{ cursor: 'pointer' }}
              onClick={() => toggleSort('sex')}
            >
              Sex
              <span className="icon">
                <i
                  className={`fas ${
                    sortKey !== 'sex'
                      ? 'fa-sort'
                      : sortOrder === 'asc'
                        ? 'fa-sort-up'
                        : 'fa-sort-down'
                  }`}
                />
              </span>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              style={{ cursor: 'pointer' }}
              onClick={() => toggleSort('born')}
            >
              Born
              <span className="icon">
                <i
                  className={`fas ${
                    sortKey !== 'born'
                      ? 'fa-sort'
                      : sortOrder === 'asc'
                        ? 'fa-sort-up'
                        : 'fa-sort-down'
                  }`}
                />
              </span>
            </span>
          </th>

          <th>
            {/* <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span> */}
            <span
              className="is-flex is-flex-wrap-nowrap"
              style={{ cursor: 'pointer' }}
              onClick={() => toggleSort('died')}
            >
              Died
              <span className="icon">
                <i
                  className={`fas ${
                    sortKey !== 'died'
                      ? 'fa-sort'
                      : sortOrder === 'asc'
                        ? 'fa-sort-up'
                        : 'fa-sort-down'
                  }`}
                />
              </span>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              selectedSlug === person.slug ? 'has-background-warning' : ''
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
                person.mother ? (
                  <PersonLink person={person.mother} />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                person.father ? (
                  <PersonLink person={person.father} />
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
