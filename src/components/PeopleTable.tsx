/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Person } from '../types';
import { useSearchParams, Link } from 'react-router-dom';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  function findParentSlug(parentName: string): string | null {
    const parent = people.find(p => p.name === parentName);

    return parent ? parent.slug : null;
  }

  const handleSortByName = () => {
    const params = new URLSearchParams(searchParams);
    const sortBy = params.get('sort');
    const orderBy = params.get('order');

    if (sortBy !== 'name') {
      params.set('sort', 'name');
      params.delete('order');
    } else if (sortBy === 'name' && !orderBy) {
      params.set('order', 'desc');
    } else if (sortBy === 'name' && orderBy === 'desc') {
      params.delete('sort');
      params.delete('order');
    }

    return `?${params.toString()}`;
  };

  const handleSortBySex = () => {
    const params = new URLSearchParams(searchParams);
    const sortBy = params.get('sort');
    const orderBy = params.get('order');

    if (sortBy !== 'sex') {
      params.set('sort', 'sex');
      params.delete('order');
    } else if (sortBy === 'sex' && !orderBy) {
      params.set('order', 'desc');
    } else if (sortBy === 'sex' && orderBy === 'desc') {
      params.delete('sort');
      params.delete('order');
    }

    return `?${params.toString()}`;
  };

  const handleSortByBorn = () => {
    const params = new URLSearchParams(searchParams);
    const sortBy = params.get('sort');
    const orderBy = params.get('order');

    if (sortBy !== 'born') {
      params.set('sort', 'born');
      params.delete('order');
    } else if (sortBy === 'born' && !orderBy) {
      params.set('order', 'desc');
    } else if (sortBy === 'born' && orderBy === 'desc') {
      params.delete('sort');
      params.delete('order');
    }

    return `?${params.toString()}`;
  };

  const handleSortByDied = () => {
    const params = new URLSearchParams(searchParams);
    const sortBy = params.get('sort');
    const orderBy = params.get('order');

    if (sortBy !== 'died') {
      params.set('sort', 'died');
      params.delete('order');
    } else if (sortBy === 'died' && !orderBy) {
      params.set('order', 'desc');
    } else if (sortBy === 'died' && orderBy === 'desc') {
      params.delete('sort');
      params.delete('order');
    }

    return `?${params.toString()}`;
  };

  const sortBy = searchParams.get('sort');
  const orderBy = searchParams.get('order');
  const queryParams = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  let sortedPeople: Person[] = [...people];

  if (sortBy === 'name') {
    sortedPeople.sort((a, b) => a.name.localeCompare(b.name));
    if (orderBy === 'desc') {
      sortedPeople.reverse();
    }
  }

  if (sortBy === 'sex') {
    sortedPeople.sort((a, b) => a.sex.localeCompare(b.sex));
    if (orderBy === 'desc') {
      sortedPeople.reverse();
    }
  }

  if (sortBy === 'born') {
    sortedPeople.sort((a, b) => a.born - b.born);
    if (orderBy === 'desc') {
      sortedPeople.reverse();
    }
  }

  if (sortBy === 'died') {
    sortedPeople.sort((a, b) => a.died - b.died);
    if (orderBy === 'desc') {
      sortedPeople.reverse();
    }
  }

  if (queryParams) {
    sortedPeople = sortedPeople.filter(
      (p: Person) =>
        p.name.toLowerCase().includes(queryParams.toLowerCase()) ||
        p.fatherName?.toLowerCase().includes(queryParams.toLowerCase()) ||
        p.motherName?.toLowerCase().includes(queryParams.toLowerCase()),
    );
  }

  if (sex === 'm') {
    sortedPeople = sortedPeople.filter(p => p.sex === 'm');
  } else if (sex === 'f') {
    sortedPeople = sortedPeople.filter(p => p.sex === 'f');
  }

  if (centuries.length > 0) {
    sortedPeople = sortedPeople.filter(p => {
      const century = Math.floor(p.born / 100) + 1;

      return centuries.includes(century.toString());
    });
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
              <Link to={handleSortByName()}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={handleSortBySex()}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={handleSortByBorn()}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={handleSortByDied()}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr key={person.slug} data-cy="person">
            <td>
              <Link
                to={{
                  pathname: `/people/${person.slug}`,
                  search: searchParams.toString(),
                }}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died ?? '-'}</td>
            <td>
              {person.motherName ? (
                <Link
                  to={{
                    pathname: `/people/${findParentSlug(person.motherName!)}`,
                    search: searchParams.toString(),
                  }}
                  className="has-text-danger"
                >
                  {person.motherName}
                </Link>
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <Link
                  to={{
                    pathname: `/people/${findParentSlug(person.motherName!)}`,
                    search: searchParams.toString(),
                  }}
                >
                  {person.motherName}
                </Link>
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
