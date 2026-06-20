import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';

interface Props {
  people: Person[];
  isLoading: boolean;
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people, isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useLocation();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortedPeople = [...people];

  if (sort) {
    sortedPeople.sort((personA, personB) => {
      if (sort === 'name' || sort === 'sex') {
        const valueA = personA[sort];
        const valueB = personB[sort];

        return order === 'desc'
          ? valueB.localeCompare(valueA)
          : valueA.localeCompare(valueB);
      }

      if (sort === 'born' || sort === 'died') {
        const valueA = personA[sort];
        const valueB = personB[sort];

        return order === 'desc' ? valueB - valueA : valueA - valueB;
      }

      return 0;
    });
  }

  const { slug } = useParams();

  function findParent(parentName: string | null) {
    if (!parentName) {
      return <td>-</td>;
    }

    const parent = people.find(p => p.name === parentName);

    if (parent) {
      return (
        <td>
          <PersonLink person={parent} />
        </td>
      );
    }

    return <td>{parentName}</td>;
  }

  const setSearchWith = (params: SearchParams) => {
    const searching = getSearchWith(searchParams, params);

    setSearchParams(searching);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {!isLoading && people.length > 0 && (
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                {sort !== 'name' && (
                  <a
                    onClick={() => setSearchWith({ sort: 'name', order: null })}
                  >
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                )}
                {sort === 'name' && !order && (
                  <a onClick={() => setSearchWith({ order: 'desc' })}>
                    <span className="icon">
                      <i className="fas fa-sort-up" />
                    </span>
                  </a>
                )}
                {sort === 'name' && order && (
                  <a onClick={() => setSearchWith({ sort: null, order: null })}>
                    <span className="icon">
                      <i className="fas fa-sort-down" />
                    </span>
                  </a>
                )}
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                {sort !== 'sex' && (
                  <a
                    onClick={() => setSearchWith({ sort: 'sex', order: null })}
                  >
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                )}
                {sort === 'sex' && !order && (
                  <a onClick={() => setSearchWith({ order: 'desc' })}>
                    <span className="icon">
                      <i className="fas fa-sort-up" />
                    </span>
                  </a>
                )}
                {sort === 'sex' && order && (
                  <a onClick={() => setSearchWith({ sort: null, order: null })}>
                    <span className="icon">
                      <i className="fas fa-sort-down" />
                    </span>
                  </a>
                )}
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                {sort !== 'born' && (
                  <a
                    onClick={() => setSearchWith({ sort: 'born', order: null })}
                  >
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                )}
                {sort === 'born' && !order && (
                  <a onClick={() => setSearchWith({ order: 'desc' })}>
                    <span className="icon">
                      <i className="fas fa-sort-up" />
                    </span>
                  </a>
                )}
                {sort === 'born' && order && (
                  <a onClick={() => setSearchWith({ sort: null, order: null })}>
                    <span className="icon">
                      <i className="fas fa-sort-down" />
                    </span>
                  </a>
                )}
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                {sort !== 'died' && (
                  <a
                    onClick={() => setSearchWith({ sort: 'died', order: null })}
                  >
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                )}
                {sort === 'died' && !order && (
                  <a onClick={() => setSearchWith({ order: 'desc' })}>
                    <span className="icon">
                      <i className="fas fa-sort-up" />
                    </span>
                  </a>
                )}
                {sort === 'died' && order && (
                  <a onClick={() => setSearchWith({ sort: null, order: null })}>
                    <span className="icon">
                      <i className="fas fa-sort-down" />
                    </span>
                  </a>
                )}
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
      )}

      <tbody>
        {sortedPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
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
            {findParent(person.motherName)}
            {findParent(person.fatherName)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
