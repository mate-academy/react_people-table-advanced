import React, { useCallback } from 'react';
import { Person } from '../types';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';

type Props = {
  persons: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ persons }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();

  const getClass = useCallback(
    (orderBy: string) => {
      const sortBy = searchParams.get('sort');
      const order = searchParams.get('order');

      return `fas fa-sort${sortBy !== orderBy ? '' : order === null ? '-down' : '-up'}`;
    },
    [searchParams],
  );

  const setOrder = useCallback(
    (orderBy: string) => {
      const params = new URLSearchParams(searchParams);
      const sort = searchParams.get('sort');
      const order = searchParams.get('order');

      params.delete('sort');
      params.delete('order');
      params.append('sort', orderBy);

      if (sort === orderBy && order !== 'desc') {
        params.append('order', 'desc');
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const generateLinkWithParams = useCallback(
    (path: string) => {
      return {
        pathname: path,
        search: location.search,
      };
    },
    [location.search],
  );

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
              <a onClick={() => setOrder('name')}>
                <span className="icon">
                  <i className={getClass('name')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => setOrder('sex')}>
                <span className="icon">
                  <i className={getClass('sex')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => setOrder('born')}>
                <span className="icon">
                  <i className={getClass('born')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => setOrder('died')}>
                <span className="icon">
                  <i className={getClass('died')} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {persons.map(people => {
          return (
            // eslint-disable-next-line react/jsx-key
            <tr
              data-cy="person"
              key={people.slug}
              className={`${slug === people.slug ? 'has-background-warning' : ''}`}
            >
              <td>
                <Link
                  className={`${people.sex === 'f' ? 'has-text-danger' : ''}`}
                  to={generateLinkWithParams(`/people/${people.slug}`)}
                >
                  {people.name}
                </Link>
              </td>
              <td>{people.sex}</td>
              <td>{people.born}</td>
              <td>{people.died}</td>
              <td>
                {people.motherName === null ? (
                  '-'
                ) : people.mother === undefined ? (
                  people.motherName
                ) : (
                  <Link
                    to={generateLinkWithParams(
                      `/people/${people.mother?.slug}`,
                    )}
                    className="has-text-danger"
                  >
                    {people.motherName}
                  </Link>
                )}
              </td>
              <td>
                {people.fatherName === null ? (
                  '-'
                ) : people.father === undefined ? (
                  people.fatherName
                ) : (
                  <Link
                    to={generateLinkWithParams(
                      `/people/${people.father?.slug}`,
                    )}
                  >
                    {people.fatherName ?? '-'}
                  </Link>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
