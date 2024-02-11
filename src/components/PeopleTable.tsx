/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';

import { Person } from '../types';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const allNamesOnServer = people.map(person => person.name);

  const getParentSlug = (choseName: string) => people
    .find(person => person.name === choseName)?.slug;

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
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            name,
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug: currentSlug,
          } = person;

          return (
            <tr
              key={currentSlug}
              data-cy="person"
              className={classNames({
                'has-background-warning': currentSlug === slug,
              })}
            >
              <td>
                <Link
                  to={`../${currentSlug}`}
                  className={classNames({
                    'has-text-danger': sex === 'f',
                  })}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              {motherName && allNamesOnServer.includes(motherName) ? (
                <td>
                  <Link
                    className="has-text-danger"
                    to={`../${getParentSlug(motherName)}`}
                  >
                    {motherName}
                  </Link>
                </td>
              ) : (
                <td>{motherName || '-'}</td>
              )}

              {fatherName && allNamesOnServer.includes(fatherName) ? (
                <td>
                  <Link to={`../${getParentSlug(fatherName)}`}>
                    {fatherName}
                  </Link>
                </td>
              ) : (
                <td>{fatherName || '-'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
