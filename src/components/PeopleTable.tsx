/* eslint-disable react/jsx-key */
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { Person } from '../types';

import { getSearchWith } from '../utils/searchHelper';
import { Errors } from '../types/Errors';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortField, setSortField] = useState<string | null>(null);
  const [order, setOrder] = useState<string | null>(null);
  const sex = searchParams.get('sex');

  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const filters = ['Name', 'Sex', 'Born', 'Died'];

  const handleSort = (
    field: string,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();

    let newSortOrder: 'asc' | 'desc' | null;

    if (sortField === field) {
      newSortOrder = order === 'asc' ? 'desc' : null;
    } else {
      newSortOrder = 'asc';
    }

    setSortField(field);
    setOrder(newSortOrder);

    if (newSortOrder === null) {
      setSortField(null);
    }

    const updatedSearchParams = getSearchWith(searchParams, {
      sort: newSortOrder ? field.toLowerCase() : null,
      order: newSortOrder === 'desc' ? 'desc' : null,
    });

    setSearchParams(updatedSearchParams);
  };

  const filterPeople = useMemo(() => {
    let filteredPeople = [...people];

    if (query) {
      const queryToLowerCase = query?.toLocaleLowerCase();

      filteredPeople = filteredPeople.filter(
        person =>
          person.name.toLocaleLowerCase().includes(queryToLowerCase) ||
          person.fatherName?.toLocaleLowerCase().includes(queryToLowerCase) ||
          person.motherName?.toLocaleLowerCase().includes(queryToLowerCase),
      );
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person => {
        const centuryBorn = Math.ceil(person.born / 100);

        if (centuries.includes(centuryBorn.toString())) {
          return true;
        }

        return false;
      });
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    return filteredPeople;
  }, [query, people, centuries, sex]);

  const sortedPeople = useMemo(() => {
    const sorted = [...filterPeople];

    if (sortField) {
      sorted.sort((a, b) => {
        let aValue = a;
        let bValue = b;

        if (order === 'desc') {
          [aValue, bValue] = [b, a];
        }

        if (sortField === 'Name') {
          return aValue.name.localeCompare(bValue.name);
        }

        if (sortField === 'Sex') {
          return aValue.sex.localeCompare(bValue.sex);
        }

        if (sortField === 'Born') {
          return aValue.born - bValue.born;
        }

        if (sortField === 'Died') {
          return aValue.died - bValue.died;
        }

        return 0;
      });
    }

    return sorted;
  }, [sortField, order, filterPeople]);

  if (sortedPeople.length === 0) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {Errors.notFound}
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {filters.map(filter => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {filter}
                <Link
                  onClick={e => handleSort(filter, e)}
                  to={`#${searchParams.toString()}`}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort-up': sortField === filter && order === 'asc',
                        'fa-sort-down':
                          sortField === filter && order === 'desc',
                        'fa-sort': sortField !== filter,
                      })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople?.map(person => (
          <tr
            key={person.name}
            data-cy="person"
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person}>{person.name}</PersonLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother ? (
                <PersonLink person={person.mother}>
                  {person.motherName}
                </PersonLink>
              ) : (
                person.motherName || '-'
              )}
            </td>

            <td>
              {person.father ? (
                <PersonLink person={person.father}>
                  {person.fatherName}
                </PersonLink>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
