/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useLocation, useSearchParams } from 'react-router-dom';
import { sortFunction } from '../utils/sorter';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visiblePeople, setVisiblePeople] = useState(people);

  const { pathname, search } = useLocation();

  const names: string[] = [];

  people.forEach(pers => names.push(pers.name));

  const handleSort = (atribute: string) => {
    const params = new URLSearchParams(searchParams);

    if (!params.has('sort')) {
      params.set('sort', atribute);
      setSearchParams(params);
    } else if (params.has('sort', atribute) && !params.has('order')) {
      params.set('order', 'desc');
      setSearchParams(params);
    } else if (params.has('sort') && !params.has('order')) {
      params.set('sort', atribute);
      setSearchParams(params);
    } else if (params.has('sort', atribute) && params.has('order')) {
      params.delete('sort');
      params.delete('order');
      setSearchParams(params);
    } else {
      params.set('sort', atribute);
      params.delete('order');
      setSearchParams(params);
    }
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
              pers.name
                .toLowerCase()
                .includes(currentQuerry.toLowerCase().trim()) &&
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
              pers.sex === currentSex &&
              pers.name
                .toLowerCase()
                .includes(currentQuerry.toLowerCase().trim()),
          ),
          searchParams,
        ),
      );
    } else if (!currentSex && chosenCenturies.length > 0) {
      setVisiblePeople(
        sortFunction(
          people.filter(
            pers =>
              pers.name
                .toLowerCase()
                .includes(currentQuerry.toLowerCase().trim()) &&
              chosenCenturies.includes(Math.ceil(+pers.born / 100).toString()),
          ),
          searchParams,
        ),
      );
    } else {
      setVisiblePeople(
        sortFunction(
          people.filter(pers =>
            pers.name
              .toLowerCase()
              .includes(currentQuerry.toLowerCase().trim()),
          ),
          searchParams,
        ),
      );
    }
  }, [searchParams, people]);

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
                onClick={() => handleSort('name')}
                href={`#${pathname}${search}`}
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
                onClick={() => handleSort('sex')}
                href={`#${pathname}${search}`}
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
                onClick={() => handleSort('born')}
                href={`#${pathname}${search}`}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                onClick={() => handleSort('died')}
                href={`#${pathname}${search}`}
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
