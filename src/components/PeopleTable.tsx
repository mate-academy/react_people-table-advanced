import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

const TableHead = () => (
  <thead>
    <tr>
      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          Name
          <Link to="#/people?sort=name">
            <span className="icon">
              <i className="fas fa-sort" />
            </span>
          </Link>
        </span>
      </th>

      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          Sex
          <Link to="#/people?sort=sex">
            <span className="icon">
              <i className="fas fa-sort" />
            </span>
          </Link>
        </span>
      </th>

      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          Born
          <Link to="#/people?sort=born&amp;order=desc">
            <span className="icon">
              <i className="fas fa-sort-up" />
            </span>
          </Link>
        </span>
      </th>

      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          Died
          <Link to="#/people?sort=died">
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
);

type Props = {
  people: Person[] | null;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <TableHead />
      <tbody>
        {people && people.length === 0 && (
          <p>There are no people matching the current search criteria</p>
        )}
        {people &&
          people.length > 0 &&
          people.map(person => (
            <tr
              key={person.slug}
              data-cy="person"
              className={`${person.slug === slug && 'has-background-warning'}`}
            >
              <td>
                <Link
                  className={`${person.sex === 'f' && 'has-text-danger'}`}
                  to={`${person.slug}`}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                <PersonLink person={person.mother || person.motherName} />
              </td>
              <td>
                <PersonLink person={person.father || person.fatherName} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
