/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useSearchParams } from 'react-router-dom';
import React, { useMemo } from 'react';
import { Person } from '../types';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { useFilters } from '../hooks/useFilters';

import {
  getFilteredPeople,
  getSortedPeople,
  getSortIcon,
} from '../utils/peopleTableFunctions';

type PeopleTableProps = {
  people: Person[];
  findPersonByName: (name: string | null) => Person | null;
  selectedPersonSlug?: string;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  findPersonByName,
  selectedPersonSlug,
}) => {
  const { queryLower, currentSex, selectedCenturies } = useFilters();

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSort = (field: string) => {
    if (sort !== field) {
      setSearchParams(
        getSearchWith(searchParams, { sort: field, order: 'asc' }),
      );
    } else if (order === 'asc') {
      setSearchParams(
        getSearchWith(searchParams, { sort: field, order: 'desc' }),
      );
    } else if (order === 'desc') {
      setSearchParams(getSearchWith(searchParams, { sort: null, order: null }));
    } else {
      setSearchParams(
        getSearchWith(searchParams, { sort: field, order: 'asc' }),
      );
    }
  };

  const filteredPeople = getFilteredPeople(
    people,
    queryLower,
    currentSex,
    selectedCenturies,
  );

  const sortedPeople = useMemo(
    () => getSortedPeople(filteredPeople, sort, order),
    [filteredPeople, sort, order],
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
              <span className="icon" style={{ cursor: 'pointer' }}>
                <i
                  className={getSortIcon(sort, order, 'name')}
                  onClick={() => handleSort('name')}
                />
              </span>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <span className="icon" style={{ cursor: 'pointer' }}>
                <i
                  className={getSortIcon(sort, order, 'sex')}
                  onClick={() => handleSort('sex')}
                />
              </span>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <span className="icon" style={{ cursor: 'pointer' }}>
                <i
                  className={getSortIcon(sort, order, 'born')}
                  onClick={() => handleSort('born')}
                />
              </span>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <span className="icon" style={{ cursor: 'pointer' }}>
                <i
                  className={getSortIcon(sort, order, 'died')}
                  onClick={() => handleSort('died')}
                />
              </span>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const isPersonSelected = person.slug === selectedPersonSlug;

          const motherInList = findPersonByName(person.motherName);
          const fatherInList = findPersonByName(person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': isPersonSelected,
              })}
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  className={cn({
                    'has-text-info': person.sex === 'm',
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
                {motherInList ? (
                  <Link
                    to={`../${motherInList.slug}`}
                    className={cn({
                      'has-text-info': motherInList.sex === 'm',
                      'has-text-danger': motherInList.sex === 'f',
                    })}
                  >
                    {motherInList.name}
                  </Link>
                ) : (
                  (person.motherName ?? '-')
                )}
              </td>
              <td>
                {fatherInList ? (
                  <Link
                    to={`../${fatherInList.slug}`}
                    className={cn({
                      'has-text-info': fatherInList.sex === 'm',
                      'has-text-danger': fatherInList.sex === 'f',
                    })}
                  >
                    {fatherInList.name}
                  </Link>
                ) : (
                  (person.fatherName ?? '-')
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
