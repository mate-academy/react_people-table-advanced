import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { filterPeopleByQuery } from '../utils/filterPeopleByQuery';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.get('centuries') || '';

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  // eslint-disable-next-line consistent-return
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
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
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
        {filteredPeople
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
