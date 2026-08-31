/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { Link, useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';

import { SearchLink } from './SearchLink';
import React from 'react';

type Props = {
  people: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable = ({ people }: Props) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  let visiblePeople = [...people];

  // Filter by name, mother name or father name
  if (query) {
    visiblePeople = visiblePeople.filter(person => {
      return (
        person.name.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query)
      );
    });
  }

  // Filter by centuries
  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(String(century));
    });
  }

  // Sort people
  if (sort) {
    visiblePeople.sort((personA, personB) => {
      let result = 0;

      if (sort === 'name') {
        result = personA.name.localeCompare(personB.name);
      }

      if (sort === 'sex') {
        result = personA.sex.localeCompare(personB.sex);
      }

      if (sort === 'born') {
        result = personA.born - personB.born;
      }

      if (sort === 'died') {
        result = personA.died - personB.died;
      }

      return order === 'desc' ? -result : result;
    });
  }

  // Three-state sorting:
  // 1. no sorting -> ascending
  // 2. ascending -> descending
  // 3. descending -> no sorting
  const getSortParams = (field: SortField) => {
    if (sort !== field) {
      return {
        sort: field,
        order: null,
      };
    }

    if (order !== 'desc') {
      return {
        sort: field,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const getSortIcon = (field: SortField) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    if (order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  };

  const getParent = (parentName: string | null) => {
    if (!parentName) {
      return null;
    }

    return people.find(person => person.name === parentName) || null;
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

              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex

              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born

              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died

              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          const mother = getParent(person.motherName);
          const father = getParent(person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                person.slug === personSlug
                  ? 'has-background-warning'
                  : ''
              }
            >
              <td>
                <Link
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: searchParams.toString(),
                  }}
                  className={
                    person.sex === 'f' ? 'has-text-danger' : ''
                  }
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>

              <td>{person.born}</td>

              <td>{person.died}</td>

              <td>
                {mother ? (
                  <Link
                    to={{
                      pathname: `/people/${mother.slug}`,
                      search: searchParams.toString(),
                    }}
                    className="has-text-danger"
                  >
                    {mother.name}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <Link
                    to={{
                      pathname: `/people/${father.slug}`,
                      search: searchParams.toString(),
                    }}
                  >
                    {father.name}
                  </Link>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
