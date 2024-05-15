/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

interface PeopleTableProps {
  people: Person[];
  visiblePeople: Person[];
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  visiblePeople,
}) => {
  const [searchParams] = useSearchParams();

  const { pathname, search } = useLocation();

  const names: string[] = [];

  people.forEach(pers => names.push(pers.name));

  const handleSort = (atribute: string) => {
    const params = new URLSearchParams(searchParams);

    if (!params.has('sort')) {
      params.set('sort', atribute);

      return params.toString();
    } else if (
      params.has('sort') &&
      params.get('sort') === atribute &&
      !params.has('order')
    ) {
      params.set('order', 'desc');

      return params.toString();
    } else if (params.has('sort') && !params.has('order')) {
      params.set('sort', atribute);

      return params.toString();
    } else if (
      params.has('sort') &&
      params.get('sort') === atribute &&
      params.has('order')
    ) {
      params.delete('sort');
      params.delete('order');

      return params.toString();
    } else {
      params.set('sort', atribute);
      params.delete('order');

      return params.toString();
    }
  };

  const getClass = (sortBy: string) => {
    const propperClass = {
      fas: true,
      'fa-sort': !search.includes(`sort=${sortBy}`),
      'fa-sort-up':
        search.includes(`sort=${sortBy}`) && !search.includes('order=desc'),
      'fa-sort-down':
        search.includes(`sort=${sortBy}`) && search.includes('order=desc'),
    };

    return propperClass;
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
              <Link to={`${pathname}?${handleSort('name')}`}>
                <span className="icon">
                  <i className={classNames(getClass('name'))} />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={`${pathname}?${handleSort('sex')}`}>
                <span className="icon">
                  <i className={classNames(getClass('sex'))} />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={`${pathname}?${handleSort('born')}`}>
                <span className="icon">
                  <i className={classNames(getClass('born'))} />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={`${pathname}?${handleSort('died')}`}>
                <span className="icon">
                  <i className={classNames(getClass('died'))} />
                </span>
              </Link>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {visiblePeople.map(person => {
          return (
            <PersonLink
              key={person.name}
              person={person}
              names={names}
              people={people}
            />
          );
        })}
      </tbody>
    </table>
  );
};
