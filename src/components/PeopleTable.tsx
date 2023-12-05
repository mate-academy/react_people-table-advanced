/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { GlobalContext } from './GeneralContext';
import { areArraysEqual } from '../utils/areArraysEqual';

export const PeopleTable: React.FC = () => {
  const {
    filteredPeople,
    searchParams,
    sortedPeople,
    setSortedPeople,
  } = useContext(GlobalContext);

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortByParams = (param: string) => {
    return {
      search: getSearchWith({
        sort: (sort !== param || (sort === param && order !== 'desc')
          ? param
          : '') || null,
        order: (sort === param && order !== 'desc'
          ? 'desc'
          : '') || null,
      }, searchParams),
    };
  };

  useEffect(() => {
    let resultOfSorting = [...filteredPeople];

    if (sort) {
      if (sort === 'name' || sort === 'sex') {
        resultOfSorting = resultOfSorting.sort((person1, person2) => {
          return person1[sort].localeCompare(person2[sort]);
        });
      }

      if (sort === 'born' || sort === 'died') {
        resultOfSorting = resultOfSorting.sort((person1, person2) => {
          return person1[sort] - person2[sort];
        });
      }
    }

    if (order) {
      resultOfSorting = resultOfSorting.reverse();
    }

    if (!areArraysEqual(resultOfSorting, sortedPeople)) {
      setSortedPeople(resultOfSorting);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, order, filteredPeople]);

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
              <Link
                to={sortByParams('name')}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && order !== 'desc',
                      'fa-sort-down': sort === 'name' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={sortByParams('sex')}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && order !== 'desc',
                      'fa-sort-down': sort === 'sex' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={sortByParams('born')}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && order !== 'desc',
                      'fa-sort-down': sort === 'born' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={sortByParams('died')}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && order !== 'desc',
                      'fa-sort-down': sort === 'died' && order === 'desc',
                    })}
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
        {sortedPeople.map((person: Person) => (
          <PersonLink
            key={person.name}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
