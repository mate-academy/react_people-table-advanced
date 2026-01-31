/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

interface PeopleTableProps {
  people: Person[];
  active: Person | undefined;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people, active }) => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = [...filteredPeople].filter(person => person.sex === sex);
  }

  if (sort) {
    filteredPeople.sort((a, b) => {
      switch (sort) {
        case 'born':
        case 'died':
          return order !== 'desc' ? a[sort] - b[sort] : b[sort] - a[sort];

        case 'name':
        case 'sex':
          return order !== 'desc'
            ? a[sort].localeCompare(b[sort])
            : b[sort].localeCompare(a[sort]);

        default:
          return 0;
      }
    });
  }

  const getParams = (param: string): SearchParams => {
    if (sort !== param) {
      return { sort: param };
    }

    if (sort === param && !order) {
      return { sort: param, order: 'desc' };
    }

    if (sort === param && order === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: null };
  };

  if (centuries.length !== 0) {
    filteredPeople = [...filteredPeople].filter(person => {
      const bornCentury = Math.ceil(person.born / 100).toString();
      const diedCentury = Math.ceil(person.died / 100).toString();

      return centuries.includes(bornCentury) || centuries.includes(diedCentury);
    });
  }

  if (query) {
    const lowerQuery = query.toLowerCase();

    filteredPeople = [...filteredPeople].filter(
      person =>
        person.name.toLowerCase().includes(lowerQuery) ||
        person.motherName?.toLowerCase().includes(lowerQuery) ||
        person.fatherName?.toLowerCase().includes(lowerQuery),
    );
  }

  const getIconClass = (parameters: string) => {
    if (sort !== parameters) {
      return 'fa-sort';
    }

    if (sort === parameters && !order) {
      return 'fa-sort-up';
    }

    if (sort === parameters && order === 'desc') {
      return 'fa-sort-down';
    }

    return '';
  };

  if (filteredPeople.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
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
              <SearchLink params={getParams('name')}>
                <span className="icon">
                  <i className={classNames('fas', getIconClass('name'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getParams('sex')}>
                <span className="icon">
                  <i className={classNames('fas', getIconClass('sex'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getParams('born')}>
                <span className="icon">
                  <i className={classNames('fas', getIconClass('born'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getParams('died')}>
                <span className="icon">
                  <i className={classNames('fas', getIconClass('died'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {(filteredPeople as Person[]).map((person: Person) => {
          const mother = people.find(p => p.name === person.motherName) || null;
          const father = people.find(p => p.name === person.fatherName) || null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={active === person ? 'has-background-warning' : ''}
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
