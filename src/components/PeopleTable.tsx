import React from 'react';
import { PersonLink } from './PersonLink';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface Props {
  filteredPeople: Person[];
  sortBy: string | null;
  order: string | null;
  searchParams: URLSearchParams;
  handleSort: (sort: string) => string;
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({
  filteredPeople,
  sortBy,
  order,
  searchParams,
  handleSort,
}) => {
  const { slug } = useParams();

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
              <Link to={handleSort('name')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortBy !== 'name',
                      'fa-sort-up': !order && sortBy === 'name',
                      'fa-sort-down': order && sortBy === 'name',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={handleSort('sex')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortBy !== 'sex',
                      'fa-sort-up': !order && sortBy === 'sex',
                      'fa-sort-down': order && sortBy === 'sex',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={handleSort('born')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortBy !== 'born',
                      'fa-sort-up': !order && sortBy === 'born',
                      'fa-sort-down': order && sortBy === 'born',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={handleSort('died')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortBy !== 'died',
                      'fa-sort-up': !order && sortBy === 'died',
                      'fa-sort-down': order && sortBy === 'died',
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
        {filteredPeople.map(person => {
          return (
            <tr
              className={classNames('', {
                'has-background-warning': person.slug === slug,
              })}
              key={person.name}
              data-cy="person"
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  person.mother ? (
                    <PersonLink person={person.mother} />
                  ) : (
                    <p>{person.motherName}</p>
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  person.father ? (
                    <PersonLink person={person.father} />
                  ) : (
                    <p>{person.fatherName}</p>
                  )
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
