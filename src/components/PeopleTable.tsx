import React, { useCallback } from 'react';
import { Person } from '../types/Person';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { Sex } from '../types/Sex';

type Props = {
  people: Person[];
};

const sortFields = ['name', 'sex', 'born', 'died'];

const byStr = (
  filteredPeople: Person[],
  field: 'name' | 'sex',
  order: string,
) => {
  if (order) {
    return filteredPeople.sort((a, b) => b[field].localeCompare(a[field]));
  }

  return filteredPeople.sort((a, b) => a[field].localeCompare(b[field]));
};

const byNumber = (
  filteredPeople: Person[],
  field: 'born' | 'died',
  order: string,
) => {
  if (order) {
    return filteredPeople.sort((a, b) => b[field] - a[field]);
  }

  return filteredPeople.sort((a, b) => a[field] - b[field]);
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const { selectedPersonSlug } = useParams();
  const selectedPerson = people.find(
    person => person.slug === selectedPersonSlug,
  );

  const getSort = (field: string): SearchParams => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (sort === field && !order) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const sortedPeople = useCallback(() => {
    const sortedArr = [...people];

    switch (sort) {
      case 'name': {
        return byStr(sortedArr, 'name', order);
      }

      case 'sex': {
        return byStr(sortedArr, 'sex', order);
      }

      case 'born': {
        return byNumber(sortedArr, 'born', order);
      }

      case 'died': {
        return byNumber(sortedArr, 'died', order);
      }

      default:
        return sortedArr;
    }
  }, [people, sort, order]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortFields.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field[0].toUpperCase() + field.slice(1)}
                <SearchLink params={getSort(field)}>
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort': sort !== field,
                        'fa-sort-up': sort === field && !order,
                        'fa-sort-down': sort === field && order,
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople().map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': person === selectedPerson,
            })}
          >
            <td>
              <Link
                to={{
                  pathname: `../${person.slug}`,
                  search: searchParams.toString(),
                }}
                className={cn({
                  'has-text-danger': person.sex === Sex.FEMALE,
                })}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {!!person.mother ? (
              <td>
                <Link
                  to={{
                    pathname: `../${person.mother.slug}`,
                    search: searchParams.toString(),
                  }}
                  className="has-text-danger"
                >
                  {person.mother.name}
                </Link>
              </td>
            ) : (
              <td>{!!person.motherName ? person.motherName : '-'}</td>
            )}

            {!!person.father ? (
              <td>
                <Link
                  to={{
                    pathname: `../${person.father.slug}`,
                    search: searchParams.toString(),
                  }}
                >
                  {person.father.name}
                </Link>
              </td>
            ) : (
              <td>{!!person.fatherName ? person.fatherName : '-'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
