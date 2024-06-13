/* eslint-disable jsx-a11y/control-has-associated-label */

import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { useCallback } from 'react';
import { getSearchWith } from '../utils/searchHelper';

export interface PeopleTableType {
  people: Person[];
}

export const PeopleTable: React.FC<PeopleTableType> = ({ people }) => {
  const { slug } = useParams();
  const { search } = useLocation();
  const [searchParam] = useSearchParams();

  const sex = searchParam.get('sex') || '';
  const query = searchParam.get('query')?.toLowerCase() || '';
  const centuries = searchParam.getAll('letters') || [];
  const sort = searchParam.get('sort') || '';
  const order = searchParam.get('order') || '';

  const getMotherLink = useCallback(
    (motherName: string) => {
      const m = people.find(mName => mName.name === motherName);

      if (m) {
        return (
          <Link
            to={{
              pathname: `/people/${m.slug}`,
              search: search.toString(),
            }}
            className="has-text-danger"
          >
            {m.name}
          </Link>
        );
      }

      return motherName;
    },
    [search, people],
  );

  const getFatherLink = useCallback(
    (fatherName: string) => {
      const f = people.find(fName => fName.name === fatherName);

      if (f) {
        return (
          <Link
            to={{
              pathname: `/people/${f.slug}`,
              search: search.toString(),
            }}
          >
            {f.name}
          </Link>
        );
      }

      return fatherName;
    },
    [search, people],
  );

  const getFilteredPeople = () => {
    const result = people
      .filter(p => p.sex.includes(sex))
      .filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          (p.motherName && p.motherName.toLowerCase().includes(query)) ||
          (p.fatherName && p.fatherName.toLowerCase().includes(query)),
      );

    const res = centuries.length === 0 ? result : [];

    for (const century of centuries) {
      const born = result.filter(
        p =>
          p.born < parseInt(century) * 100 &&
          p.born > (parseInt(century) - 1) * 100,
      );

      res.push(...born);
    }

    if (sort) {
      const typedSort = sort as 'name' | 'born' | 'died' | 'sex';
      const desc = order === 'desc';

      if (typedSort) {
        if (desc) {
          res.sort((p1, p2) =>
            p2[typedSort].toString().localeCompare(p1[typedSort].toString()),
          );
        } else {
          res.sort((p1, p2) =>
            p1[typedSort].toString().localeCompare(p2[typedSort].toString()),
          );
        }
      }
    }

    return res;
  };

  const getCategoriesSort = (type: string) => {
    if (sort === type && !order) {
      return getSearchWith(searchParam, { sort: type, order: 'desc' });
    }

    if (sort === type && order) {
      return getSearchWith(searchParam, { sort: null, order: null });
    }

    return getSearchWith(searchParam, { sort: type, order: null });
  };

  const isSearch = search && getFilteredPeople().length === 0 ? true : false;

  return (
    <>
      {isSearch && (
        <p>There are no people matching the current search criteria</p>
      )}

      {!isSearch && (
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
                      search: getCategoriesSort('name'),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          {
                            'fa-sort': sort !== 'name',
                          },
                          {
                            'fa-sort-up': sort === 'name' && !order,
                          },
                          {
                            'fa-sort-down': sort === 'name' && order,
                          },
                        )}
                      ></i>
                    </span>
                  </Link>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <Link
                    to={{
                      search: getCategoriesSort('sex'),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          {
                            'fa-sort': sort !== 'sex',
                          },
                          {
                            'fa-sort-up': sort === 'sex' && !order,
                          },
                          {
                            'fa-sort-down': sort === 'sex' && order,
                          },
                        )}
                      ></i>
                    </span>
                  </Link>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <Link
                    to={{
                      search: getCategoriesSort('born'),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          {
                            'fa-sort': sort !== 'born',
                          },
                          {
                            'fa-sort-up': sort === 'born' && !order,
                          },
                          {
                            'fa-sort-down': sort === 'born' && order,
                          },
                        )}
                      ></i>
                    </span>
                  </Link>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <Link
                    to={{
                      search: getCategoriesSort('died'),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          {
                            'fa-sort': sort !== 'died',
                          },
                          {
                            'fa-sort-up': sort === 'died' && !order,
                          },
                          {
                            'fa-sort-down': sort === 'died' && order,
                          },
                        )}
                      ></i>
                    </span>
                  </Link>
                </span>
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {getFilteredPeople().map(person => {
              return (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={classNames({
                    'has-background-warning': slug === person.slug,
                  })}
                >
                  <td>
                    <Link
                      to={{
                        pathname: `/people/${person.slug}`,
                        search: search,
                      }}
                      className={classNames({
                        'has-text-danger': person.sex === 'f',
                      })}
                    >
                      {person.name}
                    </Link>
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.motherName ? getMotherLink(person.motherName) : '-'}
                  </td>
                  <td>
                    {person.fatherName ? getFatherLink(person.fatherName) : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
