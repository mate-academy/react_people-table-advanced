/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useLocation, useSearchParams } from 'react-router-dom';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPeople = [...people];
  const [filteredPeople, setFilteredPeople] = useState(people);
  const [sortedPeople, setSortedPeople] = useState(people);

  const { pathname, search } = useLocation();

  const names: string[] = [];

  people.forEach(pers => names.push(pers.name));

  const handleSort = (atribute: string) => {
    const params = new URLSearchParams(searchParams);

    switch (atribute) {
      case 'name':
        if (!params.has('sort', atribute)) {
          setSortedPeople(
            initialPeople.sort((elem1, elem2) => {
              return elem1.name.localeCompare(elem2.name);
            }),
          );
        }

        if (params.has('sort', atribute) && !params.has('order')) {
          setSortedPeople(
            initialPeople.sort((elem1, elem2) => {
              return elem2.name.localeCompare(elem1.name);
            }),
          );
        }

        if (params.has('sort', atribute) && params.has('order')) {
          setSortedPeople(people);
        }

        break;

      case 'sex':
        if (!params.has('sort', atribute)) {
          setSortedPeople(
            initialPeople.sort((elem1, elem2) => {
              return elem1.sex.localeCompare(elem2.sex);
            }),
          );
        }

        if (params.has('sort', atribute) && !params.has('order')) {
          setSortedPeople(
            initialPeople.sort((elem1, elem2) => {
              return elem2.sex.localeCompare(elem1.sex);
            }),
          );
        }

        if (params.has('sort', atribute) && params.has('order')) {
          setSortedPeople(people);
        }

        break;

      case 'born':
        if (!params.has('sort', atribute)) {
          setSortedPeople(
            initialPeople.sort((elem1, elem2) => {
              return +elem1.born - +elem2.born;
            }),
          );
        }

        if (params.has('sort', atribute) && !params.has('order')) {
          setSortedPeople(
            initialPeople.sort((elem1, elem2) => {
              return elem2.born - elem1.born;
            }),
          );
        }

        if (params.has('sort', atribute) && params.has('order')) {
          setSortedPeople(people);
        }

        break;

      case 'died':
        if (!params.has('sort', atribute)) {
          setSortedPeople(
            initialPeople.sort((elem1, elem2) => {
              return +elem1.died - +elem2.died;
            }),
          );
        }

        if (params.has('sort', atribute) && !params.has('order')) {
          setSortedPeople(
            initialPeople.sort((elem1, elem2) => {
              return elem2.died - elem1.died;
            }),
          );
        }

        if (params.has('sort', atribute) && params.has('order')) {
          setSortedPeople(people);
        }

        break;
    }

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
      setFilteredPeople(
        sortedPeople.filter(
          pers =>
            pers.sex === currentSex &&
            pers.name
              .toLowerCase()
              .includes(currentQuerry.toLowerCase().trim()) &&
            chosenCenturies.includes(Math.ceil(+pers.born / 100).toString()),
        ),
      );
    } else if (currentSex && chosenCenturies.length === 0) {
      setFilteredPeople(
        sortedPeople.filter(
          pers =>
            pers.sex === currentSex &&
            pers.name
              .toLowerCase()
              .includes(currentQuerry.toLowerCase().trim()),
        ),
      );
    } else if (!currentSex && chosenCenturies.length > 0) {
      setFilteredPeople(
        sortedPeople.filter(
          pers =>
            pers.name
              .toLowerCase()
              .includes(currentQuerry.toLowerCase().trim()) &&
            chosenCenturies.includes(Math.ceil(+pers.born / 100).toString()),
        ),
      );
    } else {
      setFilteredPeople(
        sortedPeople.filter(pers =>
          pers.name.toLowerCase().includes(currentQuerry.toLowerCase().trim()),
        ),
      );
    }
  }, [sortedPeople, searchParams, filteredPeople, setSortedPeople]);

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
        {filteredPeople.map(person => {
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
