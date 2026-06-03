/* eslint-disable jsx-a11y/control-has-associated-label */

import { Link } from 'react-router-dom';
import { Person } from '../types';
import { PersonTable } from './PersonTable';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

type Props = {
  people: Person[];
  allPeople: Person[];
  searchParams: URLSearchParams;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  searchParams,
  allPeople,
}) => {
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortSearch = (field: string) => {
    if (sort !== field) {
      return getSearchWith(searchParams, {
        sort: field,
        order: null,
      });
    }

    if (order !== 'desc') {
      return getSearchWith(searchParams, {
        sort: field,
        order: 'desc',
      });
    }

    return getSearchWith(searchParams, {
      sort: null,
      order: null,
    });
  };

  function filterring() {
    const filteredVisiblePeople = [...people].sort((personA, personB) => {
      switch (sort) {
        case 'name':
          if (order !== 'desc') {
            return personA.name.localeCompare(personB.name);
          } else {
            return personB.name.localeCompare(personA.name);
          }

        case 'sex':
          if (order !== 'desc') {
            return personA.sex.localeCompare(personB.sex);
          } else {
            return personB.sex.localeCompare(personA.sex);
          }

        case 'born':
          if (order !== 'desc') {
            return +personA.born - +personB.born;
          } else {
            return +personB.born - +personA.born;
          }

        case 'died':
          if (order !== 'desc') {
            return +personA.died - +personB.died;
          } else {
            return +personB.died - +personA.died;
          }

        default:
          return 0;
      }
    });

    return filteredVisiblePeople;
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
              <Link
                to={{
                  search: getSortSearch('name'),
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && order === null,
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
                to={{
                  search: getSortSearch('sex'),
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && order === null,
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
                to={{
                  search: getSortSearch('born'),
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && order === null,
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
                to={{
                  search: getSortSearch('died'),
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && order === null,
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
        {filterring().map(person => {
          return (
            <PersonTable
              key={person.slug}
              person={person}
              allPeople={allPeople}
            />
          );
        })}
      </tbody>
    </table>
  );
};
