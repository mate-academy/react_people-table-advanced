import React from 'react';
import { PersonLink } from '../components/PersonLink';
import { Person } from '../types';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

type Props = {
  people: Person[];
  allPeople: Person[];
  selectedSlug?: string;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({
  people,
  allPeople,
  selectedSlug,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const toggleSort = (field: string) => {
    if (currentSort !== field) {
      searchParams.set('sort', field);
      searchParams.delete('order');
    } else {
      if (!currentOrder) {
        searchParams.set('order', 'desc');
      } else if (currentOrder === 'desc') {
        searchParams.delete('sort');
        searchParams.delete('order');
      }
    }

    setSearchParams(searchParams);
  };

  const renderSortIcon = (field: string) => {
    if (currentSort !== field) {
      return (
        <span className="icon">
          <i className="fas fa-sort" />
        </span>
      );
    } else {
      if (!currentOrder) {
        return (
          <span className="icon">
            <i className="fas fa-sort-up" />
          </span>
        );
      } else if (currentOrder === 'desc') {
        return (
          <span className="icon">
            <i className="fas fa-sort-down" />
          </span>
        );
      }
    }
  };

  const findPersonByName = (name?: string | null) =>
    allPeople.find(p => p.name === name);

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
                onClick={e => {
                  e.preventDefault();
                  toggleSort('name');
                }}
              >
                {renderSortIcon('name')}
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                onClick={e => {
                  e.preventDefault();
                  toggleSort('sex');
                }}
              >
                {renderSortIcon('sex')}
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                onClick={e => {
                  e.preventDefault();
                  toggleSort('born');
                }}
              >
                {renderSortIcon('born')}
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
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
            className={classNames('', {
              'has-background-warning': selectedSlug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.motherName ? (
                findPersonByName(person.motherName) ? (
                  <PersonLink person={findPersonByName(person.motherName)!} />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>

            <td>
              {person.fatherName ? (
                findPersonByName(person.fatherName) ? (
                  <PersonLink person={findPersonByName(person.fatherName)!} />
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
