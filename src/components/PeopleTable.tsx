import classNames from 'classnames';
import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[]
  personSlugSelected: string | undefined
};

export const PeopleTable: React.FC<Props> = ({
  people,
  personSlugSelected,
}) => {
  const getParent = (name: string | null) => (
    people.find((parent) => parent.name === name) || null
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
        {people.map((person) => {
          const {
            slug,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;

          const mother = getParent(motherName);
          const father = getParent(fatherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slug === personSlugSelected,
              })}
            >
              <PersonLink
                person={person}
              />

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {mother
                ? (
                  <PersonLink
                    person={mother}
                  />
                )
                : (
                  <td>
                    <p>{motherName || '-'}</p>
                  </td>
                )}
              {father
                ? (
                  <PersonLink
                    person={father}
                  />
                )
                : (
                  <td>
                    <p>{fatherName || '-'}</p>
                  </td>
                )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
