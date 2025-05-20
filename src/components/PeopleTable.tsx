/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [peopleCopy, setPeopleCopy] = useState(people);
  const [search, setSearch] = useSearchParams();
  const { slug } = useParams();
  const activeSlug = people.find(
    (person: Person) => person.slug === slug,
  )?.slug;

  useEffect(() => {
    const sortType = search.get('sort');
    const sortOrder = search.get('order') || 'asc';
    const sexFilter = search.get('sex');
    const centuriesFilter = search.getAll('centuries');
    const query = search.get('query');

    let updatedList = [...people];

    if (query) {
      const loweredQuery = query.trim().toLowerCase();

      updatedList = updatedList.filter(
        person =>
          person.name.toLowerCase().includes(loweredQuery) ||
          (person.motherName?.toLowerCase().includes(loweredQuery) ?? false) ||
          (person.fatherName?.toLowerCase().includes(loweredQuery) ?? false),
      );
    }

    if (centuriesFilter.length > 0) {
      updatedList = updatedList.filter(person =>
        centuriesFilter.includes(
          (Math.floor((person.born - 1) / 100) + 1).toString(),
        ),
      );
    }

    if (sexFilter === 'm') {
      updatedList = updatedList.filter(person => person.sex === 'm');
    } else if (sexFilter === 'f') {
      updatedList = updatedList.filter(person => person.sex === 'f');
    }

    if (sortType) {
      updatedList.sort((a, b) => {
        const aValue = a[sortType as keyof Person];
        const bValue = b[sortType as keyof Person];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
    }

    setPeopleCopy(updatedList);
  }, [search, people]);

  const findMother = (child: Person) => {
    return people.find((person: Person) => child.motherName === person.name);
  };

  const findFather = (child: Person) => {
    return people.find((person: Person) => child.fatherName === person.name);
  };

  const handleSort = (sortKey: string) => {
    const currentSort = search.get('sort');
    const currentOrder = search.get('order') || 'asc';

    if (currentSort === sortKey && currentOrder === 'asc') {
      search.set('order', 'desc');
    } else if (currentSort === sortKey && currentOrder === 'desc') {
      search.delete('sort');
      search.delete('order');
    } else {
      search.set('sort', sortKey);
    }

    setSearch(search);
  };

  const handleIconStyle = (sortType: string) => {
    const currentSort = search.get('sort');
    const currentOrder = search.get('order') || 'asc';

    if (sortType === currentSort && currentOrder === 'asc') {
      return classNames('fas fa-sort-up');
    } else if (sortType === currentSort && currentOrder === 'desc') {
      return classNames('fas fa-sort-down');
    } else {
      return classNames('fas fa-sort');
    }
  };

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
              <a onClick={() => handleSort('name')}>
                <span className="icon">
                  <i className={handleIconStyle('name')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => handleSort('sex')}>
                <span className="icon">
                  <i className={handleIconStyle('sex')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => handleSort('born')}>
                <span className="icon">
                  <i className={handleIconStyle('born')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => handleSort('died')}>
                <span className="icon">
                  <i className={handleIconStyle('died')} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleCopy.map(person => {
          const mother = findMother(person);
          const father = findFather(person);

          return (
            <tr
              data-cy="person"
              key={person.name}
              className={classNames({
                'has-background-warning': person.slug === activeSlug,
              })}
            >
              <td>
                <NavLink
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: search.toString(),
                  }}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </NavLink>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <NavLink
                    className="has-text-danger"
                    to={{
                      pathname: `/people/${mother.slug}`,
                      search: search.toString(),
                    }}
                  >
                    {person.motherName}
                  </NavLink>
                ) : person.motherName ? (
                  person.motherName
                ) : (
                  '-'
                )}
              </td>
              <td>
                {father ? (
                  <NavLink
                    to={{
                      pathname: `/people/${father.slug}`,
                      search: search.toString(),
                    }}
                  >
                    {person.fatherName}
                  </NavLink>
                ) : person.fatherName ? (
                  person.fatherName
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
