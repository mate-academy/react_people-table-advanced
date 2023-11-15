import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { filterPeopleByQuery } from '../utils/filterPeopleByQuery';
import { SearchLink } from './SearchLink';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.get('centuries') || '';

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  const filteredPeople: Person[] | undefined = useMemo(() => {
    const filteredPeopleByQuery = filterPeopleByQuery(query, people);

    if (!sex && !centuries) {
      return filteredPeopleByQuery;
    }

    const filterPeopleBySex = filteredPeopleByQuery
      .filter((person) => person.sex === sex);

    const filteredPeopleByCentury = filteredPeopleByQuery
      .filter(person => (Math.ceil(person.born / 100))
        .toString() === centuries);

    if (sex) {
      return filterPeopleBySex;
    }

    if (centuries) {
      return filteredPeopleByCentury;
    }

    return filteredPeopleByQuery;
  }, [query, sex, people, searchParams, centuries]);

  const handleSortChange = (sortBy: string) => {
    let result: {
      sort: string | null;
      order: string | null;
    } = { sort: sortBy, order: 'desc' };
    const isSortBy = sort === sortBy;
    const isDesc = order === 'desc';

    if (isSortBy && isDesc) {
      result = { sort: null, order: null };
    }

    if (!isSortBy && !isDesc) {
      result = { sort: sortBy, order: null };
    }

    if (!isSortBy && isDesc) {
      result = { sort: sortBy, order: null };
    }

    return result;
  };

  const sortedPeople = filteredPeople
    .sort((a: Person, b: Person) => {
      if (order === 'desc' && sort === 'name') {
        return b.name.localeCompare(a.name);
      }

      if (!order && sort === 'name') {
        return a.name.localeCompare(b.name);
      }

      if (order === 'desc' && sort === 'sex') {
        return b.sex.localeCompare(a.sex);
      }

      if (!order && sort === 'sex') {
        return a.sex.localeCompare(b.sex);
      }

      if (order === 'desc' && sort === 'born') {
        return b.born - a.born;
      }

      if (!order && sort === 'born') {
        return a.born - b.born;
      }

      if (order === 'desc' && sort === 'died') {
        return b.died - a.died;
      }

      if (!order && sort === 'died') {
        return a.died - b.died;
      }

      return a.name.localeCompare(b.name);
    });

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
              <SearchLink params={handleSortChange('name')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleSortChange('sex')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleSortChange('born')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleSortChange('died')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople
          .map((person) => (
            <tr data-cy="person" key={person.name}>
              <td>
                <Link to="#/people/pieter-haverbeke-1602">{person.name}</Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <Link to={person.slug}>
                  {person.motherName ? person.motherName : '-'}
                </Link>
              </td>
              <td>
                <Link to={person.slug}>
                  {person.fatherName ? person.fatherName : '-'}
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
