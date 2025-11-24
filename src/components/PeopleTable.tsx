/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Person } from '../types';
import { NavLink } from 'react-router-dom';

type PeopleTableProps = {
  people: Person[];
  searchParams: URLSearchParams;
  setSearchParams: (nextInit: URLSearchParams | Record<string, string>) => void;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  searchParams,
  setSearchParams,
}) => {
  const toggleSort = (field: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentField = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentField !== field) {
      params.set('sort', field);
      params.set('order', 'asc');
    } else {
      if (!currentOrder || currentOrder === 'asc') {
        params.set('order', 'desc');
      } else {
        params.delete('sort');
        params.delete('order');
      }
    }

    setSearchParams(params);
  };

  const renderArrow = (field: string) => {
    const sortField = searchParams.get('sort');
    const order = searchParams.get('order');

    if (sortField !== field) {
      return <i className="fas fa-sort" />;
    }

    if (order === 'desc') {
      return <i className="fas fa-sort-down" />;
    }

    return <i className="fas fa-sort-up" />;
  };

  const findSlugByName = (name?: string) => {
    if (!name) {
      return null;
    }

    const person = people.find(p => p.name === name);

    return person ? person.slug : null;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span
              role="button"
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => toggleSort('name')}
            >
              Name
              <span className="icon"> {renderArrow('name')}</span>
            </span>
          </th>

          <th>
            <span
              role="button"
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => toggleSort('sex')}
            >
              Sex
              <span className="icon">{renderArrow('sex')}</span>
            </span>
          </th>

          <th>
            <span
              role="button"
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => toggleSort('born')}
            >
              Born
              <span className="icon"> {renderArrow('born')}</span>
            </span>
          </th>

          <th>
            <span
              role="button"
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => toggleSort('died')}
            >
              Died
              <span className="icon"> {renderArrow('died')}</span>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(p => (
          <tr key={p.slug} data-cy="person">
            <td>
              <NavLink
                className={p.sex === 'f' ? 'has-text-danger' : ''}
                to={{
                  pathname: `/people/${p.slug}`,
                  search: searchParams.toString(),
                }}
              >
                {p.name}
              </NavLink>
            </td>
            <td>{p.sex}</td>
            <td>{p.born}</td>
            <td>{p.died}</td>
            <td>
              {p.motherName ? (
                findSlugByName(p.motherName) ? (
                  <NavLink
                    className={'has-text-danger'}
                    to={{
                      pathname: `/people/${findSlugByName(p.motherName)}`,
                      search: searchParams.toString(),
                    }}
                  >
                    {p.motherName}
                  </NavLink>
                ) : (
                  p.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {p.fatherName ? (
                findSlugByName(p.fatherName) ? (
                  <NavLink
                    to={{
                      pathname: `/people/${findSlugByName(p.fatherName)}`,
                      search: searchParams.toString(),
                    }}
                  >
                    {p.fatherName}
                  </NavLink>
                ) : (
                  p.fatherName
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
