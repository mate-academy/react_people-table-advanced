import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  selectedPerson: Person | undefined;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
};
export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson,
  searchParams,
  setSearchParams,
  sortOrder,
  setSortOrder,
}) => {
  const getNextSortOrder = (currentOrder: string) => {
    const params = new URLSearchParams(searchParams);

    switch (currentOrder) {
      case 'asc':
        params.set('order', 'desc');
        setSearchParams(params);

        return 'desc';
      case 'desc':
        params.delete('order');
        setSearchParams(params);

        return 'none';
      default:
        return 'asc';
    }
  };

  function handleSortFieldChange(sortField: string) {
    const params = new URLSearchParams(searchParams);

    params.set('sort', sortField);
    setSearchParams(params);
  }

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
                href="#/people?sort=name"
                onClick={e => {
                  e.preventDefault();
                  handleSortFieldChange('name');
                  setSortOrder(getNextSortOrder(sortOrder));
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people?sort=sex"
                onClick={e => {
                  e.preventDefault();
                  handleSortFieldChange('sex');
                  setSortOrder(getNextSortOrder(sortOrder));
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born&amp;order=desc"
                onClick={e => {
                  e.preventDefault();
                  handleSortFieldChange('born');
                  setSortOrder(getNextSortOrder(sortOrder));
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                onClick={e => {
                  e.preventDefault();
                  handleSortFieldChange('died');
                  setSortOrder(getNextSortOrder(sortOrder));
                }}
              >
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
              'has-background-warning': selectedPerson?.slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother && person.mother.slug ? (
                <Link
                  to={`/people/${person.mother.slug}`}
                  className="has-text-danger"
                >
                  {person.motherName}
                </Link>
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <Link to={`/people/${person.father.slug}`}>
                  {person.fatherName}
                </Link>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
