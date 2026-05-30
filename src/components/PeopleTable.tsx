import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  searchParams,
  setSearchParams,
}) => {
  const handleSort = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    const newParams = new URLSearchParams(searchParams);

    if (currentSort !== field) {
      newParams.set('sort', field);
      newParams.delete('order');
    } else if (!currentOrder) {
      newParams.set('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

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
                href="#/"
                onClick={e => {
                  e.preventDefault();
                  handleSort('name');
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort"></i>
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/"
                onClick={e => {
                  e.preventDefault();
                  handleSort('sex');
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort"></i>
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/"
                onClick={e => {
                  e.preventDefault();
                  handleSort('born');
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort"></i>
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/"
                onClick={e => {
                  e.preventDefault();
                  handleSort('died');
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort"></i>
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
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : person.motherName ? (
                person.motherName
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : person.fatherName ? (
                person.fatherName
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
