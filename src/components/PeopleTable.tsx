import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  slug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, slug }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSort = (field: string) => {
    const isSorted = sort === field;
    const isOrder = isSorted && order === 'desc';
    let newParams = {};

    if (!isSorted) {
      newParams = { sort: field, order: null };
    } else if (!isOrder) {
      newParams = { sort: field, order: 'desc' };
    } else {
      newParams = { sort: null, order: null };
    }

    navigate({ search: getSearchWith(searchParams, newParams) });
  };

  const tableHeaders = [
    { field: 'name', label: 'Name' },
    { field: 'sex', label: 'Sex' },
    { field: 'born', label: 'Born' },
    { field: 'died', label: 'Died' },
  ];

  const getIcon = (field: string) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    if (order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeaders.map(({ field, label }) => {
            return (
              <th key={label}>
                <span
                  className="is-flex is-flex-wrap-nowrap"
                  onClick={() => handleSort(field)}
                >
                  {label}
                  <span className="icon">
                    <i className={getIcon(field)} />
                  </span>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person: Person) => {
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
                  to={`/people/${person.slug}`}
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
                {person.motherName ? (
                  <PersonLink people={people} name={person.motherName} />
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  <PersonLink people={people} name={person.fatherName} />
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
