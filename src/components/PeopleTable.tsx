import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Link, useParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  sort: string;
  order: string;
  searchParams: URLSearchParams;
  sortedPeople: Person[];
  handlePeopleSort: (sortField: string) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  sort,
  order,
  searchParams,
  sortedPeople,
  handlePeopleSort,
}) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => handlePeopleSort('name')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    sort: 'name',
                    order: sort !== 'name' ? null : !order ? 'desc' : null,
                  }),
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && !order,
                      'fa-sort-down': sort === 'name' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th onClick={() => handlePeopleSort('sex')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    sort: 'sex',
                    order: sort !== 'sex' ? null : !order ? 'desc' : null,
                  }),
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && !order,
                      'fa-sort-down': sort === 'sex' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th onClick={() => handlePeopleSort('born')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    sort: 'born',
                    order: sort !== 'born' ? null : !order ? 'desc' : null,
                  }),
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && !order,
                      'fa-sort-down': sort === 'born' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th onClick={() => handlePeopleSort('died')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    sort: 'died',
                    order: sort !== 'died' ? null : !order ? 'desc' : null,
                  }),
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && !order,
                      'fa-sort-down': sort === 'died' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const isSelected = slug === person.slug;

          const motherName = person.motherName || '';
          const fatherName = person.fatherName || '';

          const mother = motherName
            ? people.find(foundPerson => foundPerson.name === motherName)
            : undefined;
          const father = fatherName
            ? people.find(foundPerson => foundPerson.name === fatherName)
            : undefined;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {motherName ? (
                  mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    <span>{motherName}</span>
                  )
                ) : (
                  <span>-</span>
                )}
              </td>
              <td>
                {fatherName ? (
                  father ? (
                    <PersonLink person={father} />
                  ) : (
                    <span>{fatherName}</span>
                  )
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
