/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import * as peopleFromApi from '../api';
interface PeopleInterface {
  peopleApi: Person[];
  setPeopleApi: React.Dispatch<React.SetStateAction<Person[]>>;
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<PeopleInterface> = ({
  peopleApi,
  setPeopleApi,
}) => {
  const [click, setClick] = useState<number>();
  // * Пізнiше передати через компонент пропс, зробити тру після then
  // The sidebar with the filters should appear only when people are loaded.

  const [loadUser, setLoadUser] = useState(false);

  // filter
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name') || '';
  const sex = searchParams.get('sex') || '';
  const born = searchParams.get('born') || '';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const died = searchParams.get('died') || '';
  // sorting
  const [sortingParams, setSortingParams] = useState('');
  const [clickCounterState, setCleckCounterState] = useState(0);
  const [lastSortedColumn, setLastSortedColumn] = useState('');

  type Param = string | number;
  type Params = {
    [key: string]: Param[] | Param | null;
  };

  function getSearchParametr(
    params: Params,
    search?: string | URLSearchParams,
  ) {
    const newParams = new URLSearchParams(search);

    for (const [key, value] of Object.entries(params)) {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);
        value.forEach(item => newParams.append(key, item.toString()));
      } else {
        newParams.set(key, value.toString());
      }
    }

    return newParams.toString();
  }

  function setSearchWith(params: Params) {
    const search = getSearchParametr(params, searchParams);

    setSearchParams(search);
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchWith({ name: event.target.value });
  }

  function handleSexChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchWith({ sex: event.target.value });
  }

  function handleBornChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchWith({ born: event.target.value });
  }

  function handleDiedChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchWith({ died: event.target.value });
  }

  useEffect(() => {
    peopleFromApi.getPeople().then(item => {
      setPeopleApi(item);
    });
  }, []);

  // sorting table
  function sortTable() {
    let sortedPeople = [...peopleApi];

    // Оновлюємо параметр order
    const newSearchParams = new URLSearchParams(searchParams);

    switch (sortingParams) {
      case 'name':
        if (clickCounterState === 1) {
          sortedPeople.sort((a, b) => a.name.localeCompare(b.name));
        } else if (clickCounterState === 2) {
          sortedPeople.sort((a, b) => b.name.localeCompare(a.name));
        } else {
          sortedPeople = [...peopleApi];
        }

        break;

        break;
      case 'sex':
        if (clickCounterState === 1) {
          sortedPeople.sort((a, b) => a.sex.localeCompare(b.sex));
        } else if (clickCounterState === 2) {
          sortedPeople.sort((a, b) => b.sex.localeCompare(a.sex));
        } else if (clickCounterState === 3) {
          sortedPeople = [...peopleApi];
        }

        break;
      case 'born':
        if (clickCounterState === 1) {
          sortedPeople.sort((a, b) => a.born - b.born);
        } else if (clickCounterState === 2) {
          sortedPeople.sort((a, b) => b.born - a.born);
        } else if (clickCounterState === 3) {
          sortedPeople = [...peopleApi];
        }

        break;
      case 'died':
        if (clickCounterState === 1) {
          sortedPeople.sort((a, b) => a.died - b.died);
        } else if (clickCounterState === 2) {
          sortedPeople.sort((a, b) => b.died - a.died);
        } else if (clickCounterState === 3) {
          sortedPeople = [...peopleApi];
        }

        break;
      default:
        return;
    }

    setSearchParams(newSearchParams);

    setPeopleApi(sortedPeople);
  }

  const handleSort = (column: string) => {
    let newSortOrder = 'asc'; // Default to ascending order

    if (lastSortedColumn === column) {
      // Toggle between asc and desc for the same column
      newSortOrder = clickCounterState === 1 ? 'asc' : 'desc';
      setCleckCounterState(prev => (prev >= 3 ? 0 : prev + 1));
    } else {
      // Reset to ascending order if sorting on a new column
      newSortOrder = 'asc';
      setCleckCounterState(0);
    }

    setLastSortedColumn(column);
    setSortingParams(column);

    // Update the search params with the new sorting state
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('sort', column);
    newSearchParams.set('order', newSortOrder);

    setSearchParams(newSearchParams); // Update URL

    sortTable(); // Apply sorting logic
  };

  useEffect(() => {
    setCleckCounterState(0);
  }, [lastSortedColumn]);

  useEffect(() => {
    if (sortingParams) {
      sortTable();
    }
  }, [sortingParams]);

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
              <Link to="#/people?sort=name">
                <span className="icon">
                  <i
                    className="fas fa-sort"
                    onClick={() => {
                      handleSort('name');
                    }}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to="#/people?sort=sex">
                <span className="icon">
                  <i
                    className="fas fa-sort"
                    onClick={() => {
                      handleSort('sex');
                    }}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i
                    className="fas fa-sort-up"
                    onClick={() => {
                      handleSort('born');
                    }}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to="#/people?sort=died">
                <span className="icon">
                  <i
                    className="fas fa-sort"
                    onClick={() => {
                      handleSort('died');
                    }}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleApi.map((people, index) => (
          <tr
            data-cy="person"
            key={people.slug}
            className={classNames('', {
              'has-background-warning': index === click,
            })}
          >
            <td>
              <PersonLink
                name={people.name}
                slug={people.slug}
                sex={people.sex}
                index={index}
                setClick={setClick}
              />
            </td>

            <td>{people.sex}</td>
            <td>{people.born}</td>
            <td>{people.died}</td>
            <td>
              <PersonLink name={people.motherName} slug={people.slug} />
            </td>
            <td>
              <PersonLink name={people.fatherName} slug={people.slug} />
            </td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
