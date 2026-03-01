/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

export interface Props {
  selectedPeople: string | undefined;
  people: Person[]; // отфильтрованные для отображения
  allPeople: Person[]; // полный список для поиска родителей
}

export const PeopleTable: React.FC<Props> = (
  { people, allPeople, selectedPeople }) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const sortField = searchParams.get('sort') as keyof Person | null;
  const sortOrder = searchParams.get('order');

  const handleSort = (field: keyof Person) => {
    const params = new URLSearchParams(searchParams);

    if (sortField !== field) {
      // 1 клик → asc
      params.set('sort', field);
      params.delete('order');
    } else if (!sortOrder) {
      // 2 клик → desc
      params.set('order', 'desc');
    } else {
      // 3 клик → выключить сортировку
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const visiblePeople = React.useMemo(() => {
    if (!sortField) {
      return people;
    }

    const sorted = [...people].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];

      if (typeof valueA === 'string') {
        const result = valueA.localeCompare(valueB as string);

        return sortOrder === 'desc' ? -result : result;
      }

      const result = Number(valueA) - Number(valueB);

      return sortOrder === 'desc' ? -result : result;
    });

    return sorted;
  }, [people, sortField, sortOrder]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSort('name');
                }}
              >
                <span className="icon">
                  <i
                    className={
                      sortField !== 'name'
                        ? 'fas fa-sort'
                        : sortOrder === 'desc'
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort-up'
                    }
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#"
                onClick={event => {
                  event.preventDefault();
                  handleSort('sex');
                }}
              >
                <span className="icon">
                  <i
                    className={
                      sortField !== 'sex'
                        ? 'fas fa-sort'
                        : sortOrder === 'desc'
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort-up'
                    }
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSort('born');
                }}
              >
                <span className="icon">
                  <i
                    className={
                      sortField !== 'born'
                        ? 'fas fa-sort'
                        : sortOrder === 'desc'
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort-up'
                    }
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSort('died');
                }}
              >
                <span className="icon">
                  <i
                    className={
                      sortField !== 'died'
                        ? 'fas fa-sort'
                        : sortOrder === 'desc'
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort-up'
                    }
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          const mother = allPeople.find(p => p.name === person.motherName);
          const father = allPeople.find(p => p.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === selectedPeople,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
