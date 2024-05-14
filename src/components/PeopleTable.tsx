/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { sortFunction } from '../utils/sorter';
import classNames from 'classnames';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const [visiblePeople, setVisiblePeople] = useState(people);

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

  const filterByQuery = (pers: Person, currentQuerry: string) => {
    if (
      pers.name.toLowerCase().includes(currentQuerry.toLowerCase().trim()) ||
      (pers.motherName &&
        pers.motherName
          .toLowerCase()
          .includes(currentQuerry.toLowerCase().trim())) ||
      (pers.fatherName &&
        pers.fatherName
          .toLowerCase()
          .includes(currentQuerry.toLowerCase().trim()))
    ) {
      return true;
    }

    return;
  };

  useEffect(() => {
    const currentSex = searchParams.get('sex');
    const currentQuerry = searchParams.get('query') || '';
    const chosenCenturies = searchParams.getAll('centuries');

    if (currentSex && chosenCenturies.length > 0) {
      setVisiblePeople(
        sortFunction(
          people.filter(
            pers =>
              pers.sex === currentSex &&
              filterByQuery(pers, currentQuerry) &&
              chosenCenturies.includes(Math.ceil(+pers.born / 100).toString()),
          ),
          searchParams,
        ),
      );
    } else if (currentSex && chosenCenturies.length === 0) {
      setVisiblePeople(
        sortFunction(
          people.filter(
            pers =>
              pers.sex === currentSex && filterByQuery(pers, currentQuerry),
          ),
          searchParams,
        ),
      );
    } else if (!currentSex && chosenCenturies.length > 0) {
      setVisiblePeople(
        sortFunction(
          people.filter(
            pers =>
              filterByQuery(pers, currentQuerry) &&
              chosenCenturies.includes(Math.ceil(+pers.born / 100).toString()),
          ),
          searchParams,
        ),
      );
    } else {
      setVisiblePeople(
        sortFunction(
          people.filter(pers => filterByQuery(pers, currentQuerry)),
          searchParams,
        ),
      );
    }
  }, [searchParams, people]);

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
