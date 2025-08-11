// /* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  people: Person[];
  loading: boolean;
  loadingError: boolean;
  currentOrder: string | null;
  currentSort: string | null;
  handleSort: (field: string) => void;
};

export const PeopleTable: React.FC<Props> = props => {
  const { people, currentOrder, currentSort, handleSort } = props;

  const location = useLocation();

  const renderSortIcon = (field: string) => (
    <span className="icon">
      {currentSort === field && currentOrder === 'asc' && (
        <i className="fas fa-sort-up" />
      )}
      {currentSort === field && currentOrder === 'desc' && (
        <i className="fas fa-sort-down" />
      )}
      {currentSort !== field && <i className="fas fa-sort" />}
    </span>
  );

  return (
    <>
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
                  className={currentSort === 'name' ? 'has-text-link' : ''}
                  onClick={event => {
                    event.preventDefault();
                    handleSort('name');
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
                  href="#"
                  className={currentSort === 'sex' ? 'has-text-link' : ''}
                  onClick={event => {
                    event.preventDefault();
                    handleSort('sex');
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
                  href="#"
                  className={currentSort === 'born' ? 'has-text-link' : ''}
                  onClick={event => {
                    event.preventDefault();
                    handleSort('born');
                  }}
                >
                  {renderSortIcon('born')}
                </a>
              </span>
            </th>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <a
                  href="#"
                  className={currentSort === 'died' ? 'has-text-link' : ''}
                  onClick={event => {
                    event.preventDefault();
                    handleSort('died');
                  }}
                >
                  {renderSortIcon('died')}
                </a>
              </span>
            </th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {people.map(person => {
            const isActive = location.pathname === `/people/${person.slug}`;

            return (
              <tr
                data-cy="person"
                key={person.slug}
                className={cn({
                  'has-background-warning': isActive,
                })}
              >
                <td>
                  <NavLink
                    className={cn({
                      'has-text-danger': person.sex === 'f',
                    })}
                    to={`/people/${person.slug}`}
                  >
                    {person.name}
                  </NavLink>
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {people.some(p => p.name === person.motherName) ? (
                    <NavLink
                      className="has-text-danger"
                      to={`/people/${people.find(p => p.name === person.motherName)?.slug}`}
                    >
                      {person.motherName}
                    </NavLink>
                  ) : (
                    person.motherName || '-'
                  )}
                </td>
                <td>
                  {people.some(p => p.name === person.fatherName) ? (
                    <NavLink
                      to={`/people/${people.find(p => p.name === person.fatherName)?.slug}`}
                    >
                      {person.fatherName}
                    </NavLink>
                  ) : (
                    person.fatherName || '-'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
