/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types/Person';
import { TableItem } from '../TableItem';
import { FilterTableHeader, FilterAndSortParameters } from '../../types/Filters';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  persons: Person[];
};

export const TablePersons: React.FC<Props> = ({ persons }) => {
  const [filteredPersons, setFilteredPersons] = useState<Person[]>(persons);
  const { personURL } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get(FilterAndSortParameters.Query) || '';
  const centuries = searchParams.getAll(FilterAndSortParameters.Centuries) || [];
  const sex = searchParams.get(FilterAndSortParameters.Sex) || '';
  const sort = searchParams.get(FilterAndSortParameters.Sort) || '';
  const order = searchParams.get(FilterAndSortParameters.Order) || '';

  const setSearch = (sortParameter: string): string => {
    if (sort && order) {
      const searchString = getSearchWith(searchParams, {
        sort: null,
        order: null,
      });

      return searchString;
    }

    if (!sort && !order) {
      const searchString = getSearchWith(searchParams, {
        sort: sortParameter,
      });

      return searchString;
    }

    if (sort && !order) {
      const searchString = getSearchWith(searchParams, {
        sort: sortParameter,
        order: 'desc',
      });

      return searchString;
    }

    return '';
  };

  useEffect(() => {
    let filtered: Person[] = [...persons];

    if (query) {
      filtered = filtered.filter(person => {
        const { name, motherName, fatherName } = person;

        if (query) {
          return name.toLowerCase().includes(query)
          || motherName?.toLowerCase().includes(query)
          || fatherName?.toLowerCase().includes(query);
        }

        return true;
      });
    }

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      filtered = filtered.filter(person => {
        const personBornAge = `${Math.ceil(person.born / 100)}`;

        return centuries.includes(personBornAge);
      });
    }

    if (sort) {
      filtered = filtered.sort((p1, p2) => {
        if (sort === 'name' || sort === 'sex') {
          return !order
            ? p1[sort].localeCompare(p2[sort])
            : p2[sort].localeCompare(p1[sort]);
        }

        if (sort === 'born' || sort === 'died') {
          return !order
            ? p1[sort] - p2[sort]
            : p2[sort] - p1[sort];
        }

        return 0;
      });
    }

    setFilteredPersons(filtered);
  }, [searchParams]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {(Object.keys(FilterTableHeader) as Array<keyof typeof FilterTableHeader>).map(key => {
            return (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <Link
                    to={{
                      search: setSearch(FilterTableHeader[key]),
                    }}
                  >
                    <span className="icon">
                      <i className={cn(
                        'fas',
                        {
                          'fa-sort': sort !== FilterTableHeader[key],
                          'fa-sort-up': sort === FilterTableHeader[key] && !order,
                          'fa-sort-down': sort === FilterTableHeader[key] && order,
                        },
                      )}
                      />
                    </span>
                  </Link>
                </span>
              </th>
            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPersons.map(person => (
          <TableItem
            key={`${person.name}-${person.born}`}
            person={person}
            selectedUser={personURL}
          />
        ))}
      </tbody>
    </table>
  );
};
